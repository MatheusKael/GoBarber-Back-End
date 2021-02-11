import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointments from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    private appointmentsRepository: IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointments[]> {
    const cacheData = await this.cacheProvider.recover('asda');
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );
    // this.cacheProvider.save('asda', 'dasdsa');
    return appointments;
  }
}

export default ListProviderAppointmentsService;
