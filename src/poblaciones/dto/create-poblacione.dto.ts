import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { MinKey } from 'typeorm';

export class CreatePoblacioneDto {

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(5)
  @MinLength(5)
  codigo: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(2)
  @MaxLength(2)
  cod_provincia: string;
}
