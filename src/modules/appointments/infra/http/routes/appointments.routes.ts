import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthetication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();
appointmentsRouter.use(ensureAuthetication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
