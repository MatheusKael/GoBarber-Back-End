import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersSessionsController from '../controllers/UsersSessionsController';

const sessionRouter = Router();
const usersSessionsController = new UsersSessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersSessionsController.create
);

export default sessionRouter;
