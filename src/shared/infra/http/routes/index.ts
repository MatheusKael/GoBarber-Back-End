import { Router } from 'express';
import appointmentsRoutes from '@modules/appointments/http/routes/appointments.routes';
import userRoutes from '@modules/users/http/routes/users.routes';
import sessionsRoutes from '@modules/users/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
