import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateFotoDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  anuncio_id: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  path?: string;
}
