import IReturnService, { IQuery } from '../../interfaces';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export default class TeamsService {
  constructor(private model = Matches) {

  }

  async getAllMatches() {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async getFilteredMatches(query: IQuery): Promise<IReturnService> {
    const { inProgress } = query;
    if (!inProgress) {
      const data = await this.getAllMatches();
      return { status: 200, data };
    }
    const bol: boolean = JSON.parse(inProgress);
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: bol },
    });
    return { status: 200, data };
  }
}
