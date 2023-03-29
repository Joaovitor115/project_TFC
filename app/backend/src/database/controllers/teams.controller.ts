import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private service = new TeamsService()) {

  }

  async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.service.getAllTeams();
    res.status(status).json(data);
  }

  async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.getOneTeam(id);
    res.status(status).json(data);
  }
}
