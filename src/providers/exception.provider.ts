import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/pipes/global.http.exception';

export const exceptionProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter,
};
