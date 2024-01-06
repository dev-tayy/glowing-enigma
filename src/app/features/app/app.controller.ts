import { Controller, Get } from '@nestjs/common';
import { generateJWT } from 'src/common/helpers/utils.helper';
import { IResponse } from 'src/common/types';

@Controller('app')
export class AppController {
  @Get()
  async getToken(): Promise<IResponse> {
    const token = await generateJWT(
      { type: 'guest' },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      status: true,
      message: 'Token generated successfully',
      data: token,
    };
  }
}
