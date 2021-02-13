import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authorization token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  const { secret } = authConfig.jwt;

  if (!secret) {
    throw new AppError('Secret not founded');
  }

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as tokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Authorization token invalid', 401);
  }
}

export default ensureAuthentication;
