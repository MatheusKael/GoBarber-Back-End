import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  /**
   * async :execute
  Promise<void>  */
  public async execute({ name, email, password }: Request): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
