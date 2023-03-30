export default interface IReturnService {
  status: number;
  data?: object[] | object | null
}

export interface IUser {
  email: string,
  password: string
}
