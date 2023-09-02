import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class PaginateDto {
   
    @IsOptional()
    limit?:number;

    @IsOptional()
    page?:number;

    @ApiProperty({
      required: false,
      description: 'Filtrar por subcategoría del anuncio',
      example: 'GPS y electrónica' // Ejemplo de estado
    })
    @IsOptional()
    subcategoria?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar por estado del anuncio',
      example: 'Como nuevo' // Ejemplo de estado
    })
    @IsOptional()
    estado?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar por el  email del Usuario',
      example: 'prueba@gmail.com' // Ejemplo de estado
    })
    @IsOptional()
    email_usuario?:string;


    @ApiProperty({
      required: false,
      description: 'Filtrar por el código postal de la población',
      example: '01002' // Ejemplo de estado
    })
    @IsOptional()
    cod_postal?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar por el código de provincia',
      example: '01' // Ejemplo de estado
    })
    @IsOptional()
    provincia?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar por el título del anuncio',
      example: 'anuncio' // Ejemplo de estado
    })
    @IsOptional()
    titulo?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar por la Categoría',
      example: 'Motor y accesorios' // Ejemplo de estado
    })
    @IsOptional()
    categoria?:string;

    @ApiProperty({
      required: false,
      description: 'Filtrar desde fecha',
      example: '2020-1-1' // Ejemplo de estado
    })
    @IsOptional()
    fecha_desde?:Date;

    @ApiProperty({
      required: false,
      description: 'Filtrar hasta fecha',
      example: '2023-12-31' // Ejemplo de estado
    })
    @IsOptional()
    fecha_hasta?:Date;
  
  
}
