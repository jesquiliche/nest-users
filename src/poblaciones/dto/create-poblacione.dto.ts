import { IsString, MaxLength, MinLength } from 'class-validator';
import { MinKey } from 'typeorm';

export class CreatePoblacioneDto {
  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  cod_provincia: string;
}
