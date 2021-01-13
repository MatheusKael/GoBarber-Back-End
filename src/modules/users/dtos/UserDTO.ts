import User from '../infra/typeorm/entities/User';

export default class UserDTO {
  public toDTO({
    id,
    name,
    email,
    avatar,
    created_at,
    updated_at,
  }: User): Omit<User, 'password'> {
    return {
      id,
      name,
      email,
      avatar,
      created_at,
      updated_at,
    };
  }
}
