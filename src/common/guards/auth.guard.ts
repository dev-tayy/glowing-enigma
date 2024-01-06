import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyJWT } from '../helpers/utils.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  private logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();

      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new BadRequestException(
          'Invalid request. Please ensure you are passing in the correct headers!',
          'Invalid request!',
        );
      }

      const decoded = await verifyJWT(token, process.env.JWT_SECRET);
      if (!decoded) {
        throw new UnauthorizedException(
          'User session has expired. Please generate new token',
          'Unauthorized access!',
        );
      }

      const session = decoded;
      this.logger.log(session);
      req.session = session;
      return true;
    } catch (e) {
      throw new UnauthorizedException(
        'User session has expired. Please generate new token',
        'Unauthorized access!',
      );
    }
  }
}
