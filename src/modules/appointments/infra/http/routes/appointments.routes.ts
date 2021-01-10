import { Router, Request } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthetication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthetication);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request: Request, response) => {
  const { provider_id, date } = request.body;
  const appointmentRepository = new AppointmentRepository();

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
