import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { DiscountMode } from 'src/common/constants/enums';

export class DealInfoDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  title: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  note: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  brand: BrandDto;

  @ValidateIf((o) => o.discounts?.length > 0)
  @ValidateNested({ each: true })
  @Type(() => DiscountsDto)
  discounts: DiscountsDto[];
}

export class BrandDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  brand: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  description: string;

  @IsArray()
  tags: string[];

  @IsNotEmpty()
  @IsUrl()
  cover_image: string;

  @IsNotEmpty()
  @IsUrl()
  logo: string;
}

export class DiscountsDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @IsNotEmpty()
  @IsEnum(DiscountMode)
  mode: keyof typeof DiscountMode;

  @IsArray()
  conditions: string[];

  @IsNotEmpty()
  @IsAlphanumeric()
  redeem_note: string;

  @IsNotEmpty()
  @IsUrl()
  ref_code: string;
}
