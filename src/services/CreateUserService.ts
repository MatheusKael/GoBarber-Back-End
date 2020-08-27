import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  /**
   * async :execute
  Promise<void>  */
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
