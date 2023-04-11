import IReturnService, { IGetPoints, IID, IMatch, IQuery } from '../../interfaces';
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

  static async getMatchResults(homeTeam: IMatch[], awayTeam: IMatch[]) {
    let totalDraws = 0;
    let totalWins = 0;
    let totalLosses = 0;
    homeTeam.forEach((element: IMatch) => {
      if (element.homeTeamGoals === element.awayTeamGoals) { totalDraws += 1; }
      if (element.homeTeamGoals > element.awayTeamGoals) { totalWins += 1; }
      if (element.homeTeamGoals < element.awayTeamGoals) { totalLosses += 1; }
    });
    awayTeam.forEach((element: IMatch) => {
      if (element.homeTeamGoals === element.awayTeamGoals) { totalDraws += 1; }
      if (element.homeTeamGoals > element.awayTeamGoals) { totalLosses += 1; }
      if (element.homeTeamGoals < element.awayTeamGoals) { totalWins += 1; }
    });
    return { totalDraws, totalWins, totalLosses };
  }

  static async getGoals(id: number) {
    let goalsTaken = 0;
    let goalsMade = 0;
    const homeTeams = await Matches.findAll({ where: { homeTeamId: id, inProgress: false } });
    const awayTeams = await Matches.findAll({ where: { awayTeamId: id, inProgress: false } });
    homeTeams.forEach((element) => {
      goalsMade += JSON.parse(element.homeTeamGoals);
      goalsTaken += JSON.parse(element.awayTeamGoals);
    });
    awayTeams.forEach((element) => {
      goalsMade += JSON.parse(element.awayTeamGoals);
      goalsTaken += JSON.parse(element.homeTeamGoals);
    });
    return { goalsMade, goalsTaken };
  }

  static async getPoints(id: number): Promise<IGetPoints> {
    const { goalsMade, goalsTaken } = await MatchesS.getGoals(id);
    const { teamName } = await Teams.findByPk(id) as Teams;
    const homeTeam = await Matches.findAll({ where: { homeTeamId: id, inProgress: false } });
    const awayTeam = await Matches.findAll({ where: { awayTeamId: id, inProgress: false } });
    const teamResulsInfo = await MatchesS.getMatchResults(homeTeam, awayTeam);
    const { totalDraws, totalLosses, totalWins } = teamResulsInfo;
    const totalGoals = goalsMade - goalsTaken;
    const totalGames = totalDraws + totalWins + totalLosses;
    return { goalsMade,
      goalsTaken,
      totalDraws,
      totalGames,
      totalWins,
      totalGoals,
      totalLosses,
      teamName };
  }

  static async getAllPoints(teams: Teams[]): Promise<IGetPoints[]> {
    return Promise.all(teams.map((element) => MatchesS.getPoints(element.id)));
  }

  static sortResults(info: any) {
    return info.sort((a: any, b: any) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);
  }

  static async getLeaderBoard(): Promise<IReturnService> {
    const teams = await Teams.findAll();
    const teamStatus = await MatchesS.getAllPoints(teams);
    const map = await Promise.all(teamStatus.map((team) => ({
      name: team.teamName,
      totalPoints: team.totalDraws + (team.totalWins * 3),
      totalGames: team.totalGames,
      totalVictories: team.totalWins,
      totalDraws: team.totalDraws,
      totalLosses: team.totalLosses,
      goalsFavor: team.goalsMade,
      goalsOwn: team.goalsTaken,
      goalsBalance: team.totalGoals,
      efficiency: (((team.totalDraws + (team.totalWins * 3)) / (team.totalGames * 3)) * 100)
        .toFixed(2),
    })));
    const data = this.sortResults(map);
    return { status: 200, data };
  }
}
