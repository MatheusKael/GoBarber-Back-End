import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserDTO from '@modules/users/dtos/UserDTO';

export default class UsersSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = container.resolve(AuthenticateSessionService);

    const { user: unmappedUser, token } = await authenticate.execute({
      email,
      password,
    });
    const userDTO = new UserDTO();

    const user = userDTO.toDTO(unmappedUser);

    return response.json({ user, token });
  }
}
