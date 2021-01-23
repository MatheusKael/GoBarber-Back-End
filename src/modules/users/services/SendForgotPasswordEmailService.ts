import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface Request {
  email: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  /**
   * async :execute
  Promise<void>  */
  public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Email de recuperacao de senha foi recebido'
    );
  }
}

export default CreateUserService;
