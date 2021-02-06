import { Router } from 'express';
import ensureAuthetication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(ensureAuthetication);

appointmentsRouter.post('/', appointmentController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
