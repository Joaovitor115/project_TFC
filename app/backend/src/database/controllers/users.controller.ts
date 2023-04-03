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
    res.status(status).json({ token });
  }

  async getRole(_req: Request, res: Response) {
    const { email } = res.locals.payload.data;
    const { status, data } = await this.service.getRole({ email });
    res.status(status).json(data);
  }
}
