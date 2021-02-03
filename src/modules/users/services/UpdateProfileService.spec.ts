import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdataProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdataProfileService;
describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdataProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      name: 'user',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'user2@example.com',
      name: 'user2',
    });

    expect(updatedUser.name).toBe('user2');
    expect(updatedUser.email).toBe('user2@example.com');
  });
  it('should not be able to update email to another used email', async () => {
    await fakeUsersRepository.create({
      email: 'user@example.com',
      name: 'user',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'user@example.com',
        name: 'user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should  be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: '1234567',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'user@example.com',
      name: 'user',
      old_password: '1234567',
      password: '123456',
    });
    expect(updatedUser.password).toBe('123456');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'user@example.com',
        name: 'user',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'user@example.com',
        name: 'user',
        old_password: 'wrong_old_password',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
