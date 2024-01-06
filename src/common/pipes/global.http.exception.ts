import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IResponse } from '../types';
import { GenericErrorMessages } from '../constants/enums';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const code = exception instanceof HttpException && exception.getStatus();

    console.log(exception);

    const message: string =
      code === 500
        ? GenericErrorMessages.SERVER
        : this.transformMessage(
            //   @ts-ignore
            exception?.response?.message ?? GenericErrorMessages.SERVER,
          );

    const responseBody: IResponse = {
      status: false,
      //   @ts-ignore
      error: exception?.response?.error ?? 'Server error',
      message,
      code: code ?? 600,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, code || 600);
  }

  private transformMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }

    if (Array.isArray(message ?? [GenericErrorMessages.SERVER])) {
      return message[0] || GenericErrorMessages.SERVER;
    }
    return message || GenericErrorMessages.SERVER;
  }
}
