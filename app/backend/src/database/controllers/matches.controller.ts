import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class TeamsController {
  constructor(private service = new MatchesService()) {

  }

  async getFilteredMatches(req: Request, res: Response) {
    const { status, data } = await this.service.getFilteredMatches(req.query);
    res.status(status).json(data);
  }

  async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.service.patchMatch({ id });
    res.status(status).json({ message });
  }

  async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.service.updateMatchGoals({ id, ...req.body });
    res.status(status).json({ message });
  }

  async createNewMatch(req: Request, res: Response) {
    const { status, data } = await this.service.createNewMatch({ ...req.body });
    res.status(status).json(data);
  }
}
