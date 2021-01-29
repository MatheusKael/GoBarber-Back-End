import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateSessionService from './AuthenticateSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateSessionService: AuthenticateSessionService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateSessionService = new AuthenticateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 'teste da silva',
      email: 'teste@wgmail.com',
      password: '123456',
    });
    const response = await authenticateSessionService.execute({
      email: 'teste@wgmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate a non existing user', async () => {
    expect(
      authenticateSessionService.execute({
        email: 'teste@wgmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'teste da silva',
      email: 'teste@wgmail.com',
      password: '123456',
    });
    await expect(
      authenticateSessionService.execute({
        email: 'teste@wgmail.com',
        password: 'wrongpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
