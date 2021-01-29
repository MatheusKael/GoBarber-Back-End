import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      email: 'teste@wgmail.com',
      name: 'teste da silva',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create an already existing email', async () => {
    await createUser.execute({
      email: 'teste@gmail.com',
      name: 'teste da silva',
      password: '123456',
    });

    await expect(
      createUser.execute({
        email: 'teste@gmail.com',
        name: 'teste da silva',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
