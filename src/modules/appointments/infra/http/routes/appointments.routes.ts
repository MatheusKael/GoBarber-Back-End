import { Router } from 'express';
import ensureAuthetication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
appointmentsRouter.use(ensureAuthetication);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentRepository = getCustomRepository(AppointmentRepository);
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
