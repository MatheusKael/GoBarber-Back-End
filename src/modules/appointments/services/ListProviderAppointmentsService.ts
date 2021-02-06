import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointments from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointments[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );
    return appointments;
  }
}

export default ListProviderAppointmentsService;
