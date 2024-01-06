import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '../common/pipes/timeout.interceptor';

export const timeoutProvider = {
  provide: APP_INTERCEPTOR,
  useClass: TimeoutInterceptor,
};
