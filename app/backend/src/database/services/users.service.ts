import * as jwt from 'jsonwebtoken';
import { ILogin, IToken, IUser } from '../../interfaces';
import { verifyPassword } from '../Authorization/bcrypt';
import { secret, config } from '../Authorization/jwtconfig';
import Users from '../models/UsersModel';

export default class UsersService {
  constructor(private model = Users) {

  }

  async login(data: ILogin): Promise<IToken> {
    const { email, password } = data;
    const user: IUser | null = await this.model.findOne({ where: { email } });
    if (user === null) {
      return { status: 400, message: 'All fields must be filled' };
    }
    const isPasswordRight = await verifyPassword(password, user.password);

    if (isPasswordRight === false) {
      return { status: 400, message: 'All fields must be filled' };
    }

    const token = jwt.sign({ data }, secret, config);

    return { status: 200, token };
  }
}
