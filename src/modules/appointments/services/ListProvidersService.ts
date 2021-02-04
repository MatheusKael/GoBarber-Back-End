import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.listAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ShowProfileService;
