import { Request } from 'express';
import { JwtUser, JwtAdmin } from './../../types/index';

declare global {
  namespace Express {
    interface Request {
      user: JwtUser;
      admin: JwtAdmin;

      headers: { cat: string };
      session?: IJWTPayload;
    }
  }

  interface Context {
    req: Request;
  }
}
