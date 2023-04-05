import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../Authorization/jwtconfig';
import Teams from '../models/TeamsModel';

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
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, secret);
    res.locals.payload = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
  // jwt.verify(token, secret, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({ message: 'Token must be a valid token' });
  //   }
  //   res.locals.payload = decoded;
  //   next();
  // });
};
export async function validateMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  const home = await Teams.findByPk(homeTeamId);
  const away = await Teams.findByPk(awayTeamId);
  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}
