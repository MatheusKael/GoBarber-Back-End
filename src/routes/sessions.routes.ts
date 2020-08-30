import { Router, Request } from 'express';
import AuthenticateSessionService from '../services/AuthenticateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response) => {
  try {
    const { email, password } = request.body;

    const authenticate = new AuthenticateSessionService();

    const { user, token } = await authenticate.execute({
      email,
      password,
    });

    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRouter;
