import IReturnService, { IID, IMatch, IQuery } from '../../interfaces';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export default class MatchesS {
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

  async patchMatch(params: IID): Promise<IReturnService> {
    const { id } = params;
    const match = await this.model.findByPk(id);
    if (match) {
      await this.model.update({
        inProgress: false,
      }, { where: { id } });
    }
    return { status: 200, message: 'Finished' };
  }

  async updateMatchGoals(params: IID): Promise<IReturnService> {
    const { id, homeTeamGoals, awayTeamGoals } = params;
    const match = await this.model.findByPk(id);
    if (match) {
      await this.model.update({
        homeTeamGoals,
        awayTeamGoals,
      }, { where: { id } });
    }
    return { status: 200, message: 'Goals updated with success' };
  }

  async createNewMatch(match: IMatch): Promise<IReturnService> {
    const data = await this.model.create({
      ...match,
    });
    return { status: 201, data };
  }

//   async getLeaderBoard(): Promise<IReturnService> {
//     const matches = await this.getAllMatches;
//     const teams = await Teams.findAll();
//     const data: [] = [];
//     teams.map((team) => data.push(
//       {
//         name: team.teamName,
//         totalPoints: matches.filter((match) =>  ),
//         totalGames: 5,
//         totalVictories: 4,
//         totalDraws: 1,
//         totalLosses: 0,
//         goalsFavor: 17,
//         goalsOwn: 5,
//         goalsBalance: 12,
//         efficiency: 86.67,
//       },
//     ));
//     return { status: 201, data };
//   }
}
