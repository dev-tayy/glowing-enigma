import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  id: string;

  @Prop({ type: Date, required: false })
  created_at?: Date;

  @Prop({ type: Date, required: false })
  updated_at?: Date;
}
