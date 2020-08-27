import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', userRoutes);

export default routes;
