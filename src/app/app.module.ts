import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DealRepository } from './features/deals/repository/deal.repository';
import {
  MongooseModelProviders,
  exceptionProvider,
  timeoutProvider,
} from '../providers/providers';
import { DealController, DealService } from './features/deals/deal';

@Module({
  imports: [
    MongooseModelProviders,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [DealController],
  providers: [
    DealService,
    DealRepository,

    //providers
    exceptionProvider,
    timeoutProvider,
  ],
})
export class AppModule {}
