import { UserRepository } from './user.repository';
import { User } from '../types/User';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

type UserWithoutPassword = Omit<User, 'password'>;

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(user: User): Promise<UserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = {
      ...user,
      password: hashedPassword,
    };

    const { ...userWithoutPassword } = newUser;

    await this.userRepository.createUser(newUser);
    return userWithoutPassword;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const secret = process.env.SECRET as string;
    return jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '1h',
    });
  }
}
