import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class TeamsController {
  constructor(private service = new MatchesService()) {

  }

  async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.service.getAllMatches();
    res.status(status).json(data);
  }

  // async getOneTeam(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { status, data } = await this.service.getOneTeam(id);
  //   res.status(status).json(data);
  // }
}
