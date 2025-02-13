import fs from 'fs';
import csv from 'csv-parser';
import Database from 'better-sqlite3';
import { CSVValues } from '../utils/middleware/validation/types/csvValues';
import { CSVSchema } from '../types/csvSchema';

type CSVRow = {
  [K in keyof CSVValues]: CSVValues[K]['type'] extends 'number'
    ? number
    : string;
};

enum DbTypes {
  INTEGER = 'INTEGER',
  TEXT = 'TEXT',
  REAL = 'REAL',
}

class CSVImporter {
  private getColumnType<T extends keyof typeof CSVSchema>(column: T): DbTypes {
    const columnSchema = CSVSchema[column];

    if (!columnSchema) return DbTypes.TEXT;

    if (columnSchema.type === 'number') {
      return DbTypes.INTEGER;
    }

    return DbTypes.TEXT;
  }

  async importCsv(
    db: Database.Database,
    filePath: string,
    tableName: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers: (keyof CSVRow)[] = [];
      const rows: CSVRow[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('headers', (header) =>
          headers.push(...(header as (keyof CSVRow)[])),
        )
        .on('data', (row: CSVRow) => rows.push(row))
        .on('end', () => {
          if (rows.length === 0) {
            return reject(new Error('No data in CSV file'));
          }
          this.createTableAndInsertData(db, tableName, headers, rows);
          resolve();
        })
        .on('error', reject);
    });
  }

  private createTableAndInsertData(
    db: Database.Database,
    tableName: string,
    headers: (keyof CSVRow)[],
    rows: CSVRow[],
  ) {
    const filteredHeaders = headers.filter((col) => col !== 'id_trim');

    const columnDefinitions = filteredHeaders.map((col) => {
      return `"${col}" ${this.getColumnType(col)}`;
    });

    columnDefinitions.unshift(`id INTEGER PRIMARY KEY AUTOINCREMENT`);

    db.exec(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions.join(', ')});`,
    );

    const insertStmt = db.prepare(
      `INSERT INTO ${tableName} (${filteredHeaders.map((col) => `"${col}"`).join(', ')}) VALUES (${filteredHeaders.map(() => '?').join(', ')})`,
    );

    const insertTransaction = db.transaction((data: CSVRow[]) => {
      for (const row of data) {
        const values = filteredHeaders.map((col) => row[col]);
        insertStmt.run(values);
      }
    });

    insertTransaction(rows);
    console.log(`Data imported successfully into ${tableName}`);
  }
}

export default CSVImporter;
