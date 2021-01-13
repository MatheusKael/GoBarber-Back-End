import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserDTO from '@modules/users/dtos/UserDTO';

const userDTO = new UserDTO();

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      const UserWithoutPassword = userDTO.toDTO(user);

      return response.json(UserWithoutPassword);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
