import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateSessionService from './AuthenticateSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to create a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateSessionService = new AuthenticateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateSessionService = new AuthenticateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateSessionService.execute({
        email: 'teste@wgmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateSessionService = new AuthenticateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'teste da silva',
      email: 'teste@wgmail.com',
      password: '123456',
    });
    expect(
      authenticateSessionService.execute({
        email: 'teste@wgmail.com',
        password: 'wrongpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
