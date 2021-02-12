import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }

    const passwordValid = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new AppError('Email or password invalid', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new Error('Secret doenst exist');
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateSessionService;
