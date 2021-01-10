import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const userRouter = Router();

const upload = multer(uploadConfig);

class UserMap {
  public static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

userRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository();

  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const UserMapped = UserMap.toDTO(user);

    return response.json(UserMapped);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const UserMapped = UserMap.toDTO(user);

    return response.json(UserMapped);
  }
);

export default userRouter;
