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
}
