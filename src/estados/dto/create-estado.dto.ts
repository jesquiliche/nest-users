import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEstadoDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    titulo: string;
  
}
