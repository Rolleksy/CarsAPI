import Database from 'better-sqlite3';
import CSVImporter from './carCSVImporter';
import dotenv from 'dotenv';

dotenv.config();

class CarDBService {
  private static instance: Database.Database;
  private static initialized = false;

  private constructor() {}

  static async getInstance(
    dbPath: string = 'cars_instance.db',
  ): Promise<Database.Database> {
    if (!this.instance) {
      this.instance = new Database(dbPath);
    }

    if (!this.initialized) {
      await this.init();
      this.initialized = true;
    }

    return this.instance;
  }

  private static async init(): Promise<void> {
    const db = this.instance;
    const importer = new CSVImporter();
    const tableName = 'cars';
    const filePath = process.env.CSV_FILE_PATH || './data/car_dataset.csv';

    const tableExists = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
      .get(tableName);

    if (!tableExists) {
      importer
        .importCsv(db, filePath, tableName)
        .then(() => console.log('Import completed and database created.'))
        .catch((error) => console.error(error));
    } else {
      console.log('Car database already exists.');
    }
  }

  static close() {
    if (this.instance) {
      this.instance.close();
      console.log('Database connection closed.');
    }
  }
}

export default CarDBService;
