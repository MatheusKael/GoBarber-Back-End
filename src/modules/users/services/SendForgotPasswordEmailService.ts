import { inject, injectable } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
interface Request {
  email: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  /**
   * async :execute
  Promise<void>  */
  public async execute({ email }: Request): Promise<void> {
    const emailExist = await this.usersRepository.findByEmail(email);

    if (!emailExist) {
      throw new AppError('User does not exists');
    }

    await this.userTokensRepository.generate(emailExist.id);

    this.mailProvider.sendMail(
      email,
      'Email de recuperacao de senha foi recebido'
    );
  }
}

export default CreateUserService;
