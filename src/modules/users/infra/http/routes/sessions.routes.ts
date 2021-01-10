import { Router, Request } from 'express';
import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();
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
sessionRouter.post('/', async (request: Request, response) => {
  const { email, password } = request.body;
  const userRepository = new UsersRepository();

  const authenticate = new AuthenticateSessionService(userRepository);

  const { user, token } = await authenticate.execute({
    email,
    password,
  });

  const UserMapped = UserMap.toDTO(user);

  return response.json({ UserMapped, token });
});

export default sessionRouter;
