import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { User } from 'src/users/entities/user.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { File } from 'buffer';

export class CreateAnuncioDto {

  @ApiProperty({
    example: 'Ejemplo de título',
    description: 'El título del anuncio',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(5)
  @MaxLength(255)
  titulo: string;

  @ApiProperty({
    example: 'Ejemplo de descripción',
    description: 'Descripción del anuncio',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(10)
  description: string;

  @ApiProperty({
    example: 'mi_imagen.jpg',
    description: 'Path de la imagen a cargar',
    minLength: 5,
    maxLength: 255,
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  imagen: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 100.5 })
  precio: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456789' })
  telefono: string;

  @ApiProperty({
    example: 'GPS y electrónica',
    description: 'Título de subcategoría',
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({})
  subcategoria: string;

  

  @IsNotEmpty()
  @ApiProperty({
    example: 'Como nuevo',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  @MaxLength(255)
  estado: string; // Debes definir la clase Estado

  @ApiProperty({
    example: 'prueba@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3)
  @MaxLength(255)
  user: string; // Debes definir la clase User

  @ApiProperty({
    example: '01',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(2)
  @MaxLength(255)
  provincia: string;

  @ApiProperty({
    example: '01002',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(5)
  @MaxLength(5)
  cod_postal: string;
}
