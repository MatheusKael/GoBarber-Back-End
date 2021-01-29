import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create an appointment', async () => {
    const repository = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(repository).toHaveProperty('id');
    expect(repository.provider_id).toBe('123123');
  });
  it('should not be able to create two appointment at the same date', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
