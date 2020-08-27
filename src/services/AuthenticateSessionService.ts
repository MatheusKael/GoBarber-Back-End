import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email : string;
  password : string;
}
interface Response {
  user : User
 }

class AuthenticateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email or password invalid');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new Error('Email or password invalid');
    }

    return { user };
  }
}

export default AuthenticateSessionService;
