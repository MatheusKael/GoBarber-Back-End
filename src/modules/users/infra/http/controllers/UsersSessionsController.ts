import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
export default class UsersSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = container.resolve(AuthenticateSessionService);

    const { user, token } = await authenticate.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
