import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
interface Request {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  /**
   * async :execute
  Promise<void>  */
  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;

    this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
