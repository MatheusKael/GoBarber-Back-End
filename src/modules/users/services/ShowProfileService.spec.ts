import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      name: 'user',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('user');
    expect(profile.email).toBe('user@example.com');
  });
  it('should not  be able to show profile from undefined user', async () => {
    expect(
      showProfile.execute({
        user_id: 'notexists',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
