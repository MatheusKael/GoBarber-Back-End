import { Router, Request } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateSessionService();

  const { user, token } = await authenticate.execute({
    email,
    password,
  });

  delete user.password;
  return response.json({ user, token });
});

export default sessionRouter;
