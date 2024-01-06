import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { serveMain } from './serve';

const PORT = process.env.PORT || 7002;

async function bootstrap() {
  const logger = new Logger('UNIDEALS-Server');
  const app = serveMain(await NestFactory.create(AppModule));

  await app.listen(PORT, () =>
    logger.log(`
    ************************************************
            Server listening on port: ${PORT}   
    ************************************************
  `),
  );
}
bootstrap();
