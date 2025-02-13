import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async registerUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const newUser = await this.userService.registerUser(user);
      res.status(200).json(newUser);
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.loginUser(email, password);
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Logged in' });
      /*eslint-disable-next-line */ // any generates eslint error
    } catch (error: Error | any) {
      res.status(500).json({ error: `${error.message}` });
    }
  }
}
