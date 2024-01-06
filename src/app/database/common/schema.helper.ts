import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions } from 'mongoose';
import { IDeal, DealDocument } from '../models/deal_model';
import { omit } from 'lodash';

export enum DatabaseConnectionName {
  MAIN = 'unideals',
}

export enum CollectionName {
  DEALS_MODEL = 'deals',
}

export function schemaOptions(
  modelName: keyof typeof CollectionName,
): SchemaOptions {
  return {
    _id: true,
    timestamps: true,
    toObject: {
      getters: true,
    },
    toJSON: {
      getters: true,
    },
    virtuals: true,
    collection: CollectionName[modelName],
  } as SchemaOptions;
}

export function createSchema<T>(model: T) {
  const schema = SchemaFactory.createForClass(model as any);

  return { schema };
}

export function secureUserFields(data: DealDocument): IDeal {
  const { pin, meta, password, email, phone, __v, _id, ...rest } =
    data.toObject();
  return {
    ...rest,
    meta: omit(meta, ['id', '_id']),
    email: { address: email.address, is_verified: email.is_verified },
    phone: { number: phone.number, is_verified: phone.is_verified },
  };
}
