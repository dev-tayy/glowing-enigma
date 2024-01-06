import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { createSchema, schemaOptions } from '../common/schema.helper';
import { BaseSchema } from '../schema/base.schema';
import { BrandSchema, DiscountSchema } from '../schema/deal.schemas';

@Schema(schemaOptions('DEALS_MODEL'))
export class DealModel extends BaseSchema {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  note: string;

  @Prop({ type: BrandSchema, required: true })
  brand: BrandSchema;

  @Prop({ type: Array<DiscountSchema>, required: false, default: [] })
  discounts: DiscountSchema[];
}

export type IDeal = DealModel;
export type DealDocument = IDeal & Document;
export const { schema: DealSchema } = createSchema(DealModel);
