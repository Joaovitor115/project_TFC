import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../Authorization/jwtconfig';

export default function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const validateEmail = /^\S+@\S+\.\S+$/;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < 6 || !validateEmail.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}
export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }
    res.locals.payload = decoded;
    next();
  });
}
