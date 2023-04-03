import { Router } from 'express';
import UsersController from '../database/controllers/users.controller';
import TeamsController from '../database/controllers/teams.controller';
import loginMiddleware, { validateToken } from '../database/Middlewares/loginMiddleware';

const teamsController = new TeamsController();
const usersController = new UsersController();
const router = Router();

router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getOneTeam(req, res));
router.post('/login', loginMiddleware, (req, res) => usersController.login(req, res));
router.get('/login/role', validateToken, (req, res) => usersController.getRole(req, res));

export default router;
