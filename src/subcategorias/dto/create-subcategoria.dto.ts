import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubcategoriaDto {
    
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(150)
    nombre: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    descripcion: string;

    
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    imagen?: string;
  
    @IsNotEmpty()
    @IsNumber()
    categoria_id: number;
}
