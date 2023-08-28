import { MinLength,IsString, IsNotEmpty, MaxLength, IsEmail } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateCategoriaDto {
     
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    nombre: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    descripcion: string;
  
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    @MaxLength(255)
    imagen: string;
  
}
