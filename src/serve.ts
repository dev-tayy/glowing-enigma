import 'dotenv/config';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const ENV = process.env.NODE_ENV;

export const serveMain = (app: NestExpressApplication) => {
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  if (ENV === 'production') {
    app.set('trust proxy', 'loopback');
  } else {
    app.enable('trust proxy');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  return app;
};
