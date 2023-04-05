import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UsersService from '../services/users.service';
import { secret } from '../Authorization/jwtconfig';

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

  async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: 'Token not found' });
    }
    try {
      const payload = jwt.verify(token, secret);
      const { email } = payload as jwt.JwtPayload;
      const { status, data } = await this.service.getRole({ email });
      res.status(status).json(data);
    } catch (error) {
      return res.status(402).send({ message: 'Token must be a valid token' });
    }
  }
}
