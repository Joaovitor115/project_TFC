import IReturnService from '../../interfaces';
import Teams from '../models/TeamsModel';

export default class TeamsService {
  constructor(private model = Teams) {

  }

  async getAllTeams(): Promise<IReturnService> {
    const data = await this.model.findAll();
    return { status: 200, data };
  }

  async getOneTeam(id: string): Promise<IReturnService> {
    const data = await this.model.findOne({ where: { id } });
    return { status: 200, data };
  }
}
