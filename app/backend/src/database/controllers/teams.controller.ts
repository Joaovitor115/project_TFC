import { Request, Response } from 'express';
import * as teamsService from '../services/teams.service';

export async function getAllTeams(_req: Request, res: Response) {
  const { status, data } = await teamsService.getAllTeams();
  res.status(status).json(data);
}

export async function getOneTeam(req: Request, res: Response) {
  const { id } = req.params;
  const { status, data } = await teamsService.getOneTeam(id);
  res.status(status).json(data);
}
