import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const generatedHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const { id } = await fakeUsersRepository.create({
      email: 'test@example.com',
      name: 'teste',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(id);

    expect(generatedHash).toBeCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });
  it('should be not able to reset password within a invalid token ', async () => {
    expect(
      resetPassword.execute({
        password: 'sfadad',
        token: 'INVALID',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be not able to reset password within a invalid user ', async () => {
    const { token } = await fakeUserTokensRepository.generate('INVALIDUSER');
    expect(
      resetPassword.execute({
        password: 'sfadad',
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password after 2 hours', async () => {
    const { id } = await fakeUsersRepository.create({
      email: 'test@example.com',
      name: 'teste',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
