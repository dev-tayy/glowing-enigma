import { Prop, Schema } from '@nestjs/mongoose';
import { DiscountMode } from 'src/common/constants/enums';

@Schema()
export class BrandSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Array<String>, required: false, default: [] })
  tags: string[];

  @Prop({ type: String, required: true })
  cover_image: string;

  @Prop({ type: String, required: true })
  logo: string;
}

@Schema()
export class DiscountSchema {
  @Prop({ type: String, required: true })
  cover_image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: DiscountMode, required: true })
  mode: keyof typeof DiscountMode;

  @Prop({ type: Array<String>, required: false, default: [] })
  conditions: string[];

  @Prop({ type: String, required: true })
  redeem_note: string;

  @Prop({ type: String, required: true })
  ref_code: string;
}
