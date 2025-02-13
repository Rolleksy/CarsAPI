import Database from 'better-sqlite3';
import { User } from '../types/User';

export class UserRepository {
  private dbConnection: Database.Database;

  constructor(dbInstance: Database.Database) {
    this.dbConnection = dbInstance;
  }

  async createUser(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const query = `INSERT INTO users (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;

    const result = this.dbConnection.prepare(query).run(values);

    return {
      id: Number(result.lastInsertRowid),
      username: user.username,
      email: user.email,
    };
  }

  async updateUser(id: number | bigint, user: Omit<User, 'id'>): Promise<User> {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const query = `UPDATE users SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`;
    this.dbConnection.prepare(query).run([...values, id]);
    return { id, ...user };
  }

  async deleteUser(id: number | bigint): Promise<void> {
    this.dbConnection.prepare('DELETE FROM users WHERE id = ?').run(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = this.dbConnection
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email);
    return result ? (result as User) : null;
  }
}
