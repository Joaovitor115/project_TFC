import { Router } from 'express';
import UsersController from '../database/controllers/users.controller';
import TeamsController from '../database/controllers/teams.controller';
import MatchesController from '../database/controllers/matches.controller';
import loginMiddleware, { validateMatch,
  validateToken } from '../database/Middlewares/loginMiddleware';

const teamsController = new TeamsController();
const usersController = new UsersController();
const matchesController = new MatchesController();
const router = Router();

router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getOneTeam(req, res));
router.post('/login', loginMiddleware, (req, res) => usersController.login(req, res));
router.get('/login/role', (req, res) => usersController.getRole(req, res));
router.get('/matches', (req, res) => matchesController.getFilteredMatches(req, res));
router.patch(
  '/matches/:id/finish',
  validateToken,
  (req, res) => matchesController.patchMatch(req, res),
);
router.patch(
  '/matches/:id',
  validateToken,
  (req, res) => matchesController.updateMatchGoals(req, res),
);
router.post(
  '/matches',
  validateToken,
  validateMatch,
  (req, res) => matchesController.createNewMatch(req, res),
);
router.get(
  '/leaderboard/home',
  validateToken,
  (req, res) => MatchesController.getLeaderBoard(req, res),
);

export default router;
