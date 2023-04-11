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
  homeTeamGoals?: number
  awayTeamGoals?: number
}

export interface IMatch {
  awayTeamGoals: string
  awayTeamId: string
  homeTeamGoals: string
  homeTeamId: string
}
export interface ILeaderBoard {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
}

export interface IGetPoints {
  goalsMade: number
  goalsTaken: number
  totalDraws: number
  totalGames: number
  totalWins: number
  totalGoals: number
  totalLosses: number
  teamName: string

}

export type IEmail = Pick<IUser, 'email'>;
export type IRole = Pick<IUser, 'role' | 'status'>;
