import { MongooseModule } from '@nestjs/mongoose';
import { DealModel, DealSchema } from '../app/database/models/deal_model';

export const MongooseModelProviders = MongooseModule.forFeature([
  {
    name: DealModel.name,
    schema: DealSchema,
  },
]);
