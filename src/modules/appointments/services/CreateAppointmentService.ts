import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface Request {
  date: Date;
  provider_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This Date have been already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
