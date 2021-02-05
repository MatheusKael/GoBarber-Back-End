import { Router } from 'express';
import ensureAuthetication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
providersRouter.use(ensureAuthetication);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
);

export default providersRouter;
