import { UserRepository } from '../src/users/user.repository';
import Database from 'better-sqlite3';
import { User } from '../src/types/User';

describe('UserRepository', () => {
  let db: Database.Database;
  let userRepository: UserRepository;

  beforeEach(() => {
    db = new Database(':memory:');
    db.prepare(
      'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)',
    ).run();
    userRepository = new UserRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  test('should create a new user and return it with an ID', async () => {
    const newUser = {
      username: 'testUser',
      email: 'mail@mail.com',
      password: 'password',
    } as unknown as Omit<User, 'id'>;
    const result = await userRepository.createUser(newUser);

    expect(result).toHaveProperty('id');
    expect(result.username).toBe(newUser.username);
    expect(result.email).toBe(newUser.email);
  });

  test('should update an existing user', async () => {
    const newUser = {
      username: 'testUser',
      email: 'mail@mail.com',
      password: 'password',
    } as unknown as Omit<User, 'id'>;

    await userRepository.createUser(newUser);

    const userToUpdate = await userRepository.getUserByEmail(newUser.email);
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...userToUpdate,
      username: 'UpdatedUsername',
      email: 'UpdatedEmail@mail.com',
      password: 'UpdatedPassword',
    };

    const updatedResult = await userRepository.updateUser(
      userToUpdate.id,
      updatedUser,
    );

    expect(updatedResult.username).toBe(updatedUser.username);
    expect(updatedResult.email).toBe(updatedUser.email);
  });
});
