import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const repository = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(repository).toHaveProperty('id');
    expect(repository.provider_id).toBe('123123');
  });
});
