import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserDTO from '@modules/users/dtos/UserDTO';

const userDTO = new UserDTO();

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateUser = container.resolve(UpdateProfileService);

      const user = await updateUser.execute({
        user_id,
        old_password,
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
