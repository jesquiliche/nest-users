import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
  
    @IsString()
    name: string;
  
    @IsString()
    primer_apellido: string;
  
    @IsString()
    segundo_apellido: string;

    @IsString()
    user_name:string;

    @IsString()
    password:string;

    @IsString()
    email:string;
}

