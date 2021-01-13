import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const userAvatarController = new UserAvatarController();

const userRouter = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig);

userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update
);

export default userRouter;
