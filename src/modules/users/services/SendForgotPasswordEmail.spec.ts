import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmail from '../services/SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover forgot password using an email address', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      email: 'test@example.com',
      name: 'teste',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
