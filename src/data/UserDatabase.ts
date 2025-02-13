import Database from 'better-sqlite3';

export class UserDBService {
  private static instance: Database.Database;
  private static initialized = false;

  constructor() {}

  static async getInstance(
    dbPath: string = 'users_instance.db',
  ): Promise<Database.Database> {
    if (!this.instance) {
      this.instance = new Database(dbPath);
    }

    if (!this.initialized) {
      await this.init(new UserDBService());
      this.initialized = true;
    }

    return this.instance;
  }

  private static async init(userDbService: UserDBService): Promise<void> {
    const db = this.instance;
    const tableName = 'users';

    const tableExists = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
      .get(tableName);

    if (!tableExists) {
      await userDbService.createUserTable(tableName);
      console.log('User database created.');
    } else {
      console.log('User database already exists.');
    }
  }

  async createUserTable(tableName: string = 'users') {
    UserDBService.instance
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )`,
      )
      .run();
  }
}
