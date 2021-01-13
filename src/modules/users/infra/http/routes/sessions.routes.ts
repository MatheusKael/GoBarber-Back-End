import { Router } from 'express';
import UsersSessionsController from '../controllers/UsersSessionsController';

const sessionRouter = Router();
const usersSessionsController = new UsersSessionsController();

sessionRouter.post('/', usersSessionsController.create);

export default sessionRouter;
