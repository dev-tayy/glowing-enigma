import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DealRepository } from './features/deals/repository/deal.repository';
import {
  MongooseModelProviders,
  exceptionProvider,
  timeoutProvider,
} from '../providers/providers';

@Module({
  imports: [
    MongooseModelProviders,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    //services

    //repositories
    DealRepository,

    //providers
    exceptionProvider,
    timeoutProvider,
  ],
})
export class AppModule {}
