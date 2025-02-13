import Database from 'better-sqlite3';
import { Car } from '../types/Car';
import { CSVValues } from '../utils/middleware/validation/types/csvValues';

export class CarRepository {
  private dbConnection: Database.Database;

  constructor(dbInstance: Database.Database) {
    this.dbConnection = dbInstance;
  }

  async createCar(car: Omit<Car, 'id'>): Promise<Car> {
    const keys = Object.keys(car);
    const values = Object.values(car);
    const query = `INSERT INTO cars (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;

    const result = this.dbConnection.prepare(query).run(values);

    return { id: result.lastInsertRowid, ...car };
  }

  async updateCar(
    id: number | bigint,
    car: Partial<Omit<Car, 'id'>>,
  ): Promise<Car | null> {
    if (!Object.keys(car).length) {
      throw new Error('No fields to update');
    }

    const keys = Object.keys(car);
    const values = Object.values(car);

    const query = `UPDATE cars SET ${keys.map((key) => `\`${key}\` = ?`).join(', ')} WHERE id = ?`;

    const stmt = this.dbConnection.prepare(query);
    stmt.run([...values, id]);

    const updatedCar = this.dbConnection
      .prepare('SELECT * FROM cars WHERE id = ?')
      .get(id) as Car;

    return updatedCar || null;
  }

  async deteleCar(id: number | bigint): Promise<void> {
    this.dbConnection.prepare('DELETE FROM cars WHERE id = ?').run(id);
  }

  async getAllCars(
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare('SELECT * FROM cars LIMIT ? OFFSET ?')
      .all(limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare('SELECT COUNT(*) as count FROM cars')
      .get() as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  async getCarById(id: number): Promise<Car> {
    return this.dbConnection
      .prepare('SELECT * FROM cars WHERE id = ?')
      .get(id) as Car;
  }

  async getCarsByMake(
    make: string,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare('SELECT * FROM cars WHERE Make = ? LIMIT ? OFFSET ?')
      .all(make, limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare('SELECT COUNT(*) as count FROM cars WHERE Make = ?')
      .get(make) as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  async getCarsByModel(
    model: string,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare('SELECT * FROM cars WHERE Model = ? LIMIT ? OFFSET ?')
      .all(model, limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare('SELECT COUNT(*) as count FROM cars WHERE Model = ?')
      .get(model) as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  // YEARS of production endpoints
  async getCarsSinceYear(
    fromYear: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare('SELECT * FROM cars WHERE Year_from >= ? LIMIT ? OFFSET ?')
      .all(fromYear, limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare('SELECT COUNT(*) as count FROM cars WHERE Year_from >= ?')
      .get(fromYear) as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  async getCarsUntilYear(
    toYear: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare('SELECT * FROM cars WHERE Year_to <= ? LIMIT ? OFFSET ?')
      .all(toYear, limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare('SELECT COUNT(*) as count FROM cars WHERE Year_to <= ?')
      .get(toYear) as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  async getCarsByYear(
    year: number,
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const cars = this.dbConnection
      .prepare(
        'SELECT * FROM cars WHERE Year_from <= ? AND Year_to >= ? LIMIT ? OFFSET ?',
      )
      .all(year, year, limit, offset) as Car[];
    const totalCount = this.dbConnection
      .prepare(
        'SELECT COUNT(*) as count FROM cars WHERE Year_from <= ? AND Year_to >= ?',
      )
      .get(year, year) as { count: number };
    return { cars, totalCount: totalCount.count };
  }

  async multiSearchFilter(
    criteria: CSVValues[],
    limit: number,
    offset: number,
  ): Promise<{ cars: Car[]; totalCount: number }> {
    const criteriaObj = criteria[0];
    const keys = Object.keys(criteriaObj);
    const values = Object.values(criteriaObj);

    const query = `SELECT * FROM cars WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')} LIMIT ? OFFSET ?`;

    const countQuery = `SELECT COUNT(*) as count FROM cars WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`;

    const totalCountResult = this.dbConnection
      .prepare(countQuery)
      .get(values) as { count: number };
    const totalCount = totalCountResult ? totalCountResult.count : 0;

    const cars = this.dbConnection
      .prepare(query)
      .all([...values, limit, offset]) as Car[];

    return { cars, totalCount };
  }
}
