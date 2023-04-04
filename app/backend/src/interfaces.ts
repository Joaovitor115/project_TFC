export default interface IReturnService {
  status: number;
  data?: object[] | object | null
  message?: string
}

export interface IUser {
  email: string,
  password: string
  role: string
  id: number
  username: string
  status?: number
}

export interface IToken {
  token?: string
  status:number
  message?: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IQuery {
  inProgress?: string;
}

export interface IID {
  id: string
}

export type IEmail = Pick<IUser, 'email'>;
export type IRole = Pick<IUser, 'role' | 'status'>;
