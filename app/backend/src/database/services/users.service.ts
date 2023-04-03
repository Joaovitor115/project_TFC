import * as jwt from 'jsonwebtoken';
import IReturnService, { IEmail, ILogin, IToken, IUser } from '../../interfaces';
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
      return { status: 401, message: 'Invalid email or password' };
    }
    const isPasswordRight = await verifyPassword(password, user.password);

    if (isPasswordRight === false) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const token = jwt.sign({ data }, secret, config);

    return { status: 200, token };
  }

  async getRole(dataEmail: IEmail): Promise<IReturnService> {
    const { email } = dataEmail;
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return { status: 404 };
    }
    const data = { role: user.role };
    return { status: 200, data };
  }
}
