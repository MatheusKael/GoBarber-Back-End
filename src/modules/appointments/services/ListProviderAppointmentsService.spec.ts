import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to list appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 4, 20, 11, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',

      date: new Date(2021, 4, 20, 12, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
