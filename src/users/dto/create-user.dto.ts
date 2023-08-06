import { MinLength,IsString, IsNotEmpty, MaxLength, IsEmail } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateUserDto {
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    primer_apellido: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    segundo_apellido: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    user_name:string;

    @IsNotEmpty()
    @MaxLength(8)
    @Transform(({ value }) => value.trim())
    @IsString()
    
    password:string;

    @IsEmail()
    email:string;
}

