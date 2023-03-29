import { Router } from 'express';
import TeamsController from '../database/controllers/teams.controller';

const teamsController = new TeamsController();
const router = Router();

router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getOneTeam(req, res));

export default router;
