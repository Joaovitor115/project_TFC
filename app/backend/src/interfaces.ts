export default interface IReturnService {
  status: number;
  data?: object[] | object | null
}

export interface IUser {
  email: string,
  password: string
  role: string
  id: number
  username: string
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
