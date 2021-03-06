import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokenRepository',
  UserTokenRepository
);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
