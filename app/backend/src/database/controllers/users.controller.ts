import { Request, Response } from 'express';
import UsersService from '../services/users.service';

export default class UsersController {
  constructor(private service = new UsersService()) {

  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, token, message } = await this.service.login({ email, password });
    if (message) {
      return res.status(status).json({ message });
    }
    console.log(token, 'tokenzada');
    res.status(status).json({ token });
  }
}
