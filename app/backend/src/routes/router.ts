import { Router } from 'express';
import * as teamsController from '../database/controllers/teams.controller';

const router = Router();

router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getOneTeam);

export default router;
