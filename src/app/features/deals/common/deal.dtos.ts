import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { DiscountMode } from 'src/common/constants/enums';

export class BrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  cover_image: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  logo: string;
}

export class DiscountsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(DiscountMode)
  mode: keyof typeof DiscountMode;

  @IsArray()
  conditions: string[];

  @IsNotEmpty()
  @IsString()
  redeem_note: string;

  @IsNotEmpty()
  @IsUrl()
  ref_code: string;
}

export class DealInfoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @ValidateNested({ each: true })
  @Type(() => BrandDto)
  brand: BrandDto;

  @ValidateIf((o) => o.discounts?.length > 0)
  @ValidateNested({ each: true })
  @Type(() => DiscountsDto)
  discounts: DiscountsDto[];
}
