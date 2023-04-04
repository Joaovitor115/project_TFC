import IReturnService from '../../interfaces';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export default class TeamsService {
  constructor(private model = Matches) {

  }

  async getAllMatches(): Promise<IReturnService> {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 200, data };
  }

  async getOneMatch(id: string): Promise<IReturnService> {
    const data = await this.model.findOne({ where: { id } });
    return { status: 200, data };
  }
}
