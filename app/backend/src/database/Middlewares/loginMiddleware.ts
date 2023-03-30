import { Request, Response, NextFunction } from 'express';

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
