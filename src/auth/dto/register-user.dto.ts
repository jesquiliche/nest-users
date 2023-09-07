import { MinLength,IsString, IsNotEmpty, MaxLength, IsEmail } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  
    
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
        example: 'Jesús',
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength: 100,
      })
    name: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Perez',
        description: 'Primer apellido del usuario',
        minLength: 1,
        maxLength: 100,
      })
    primer_apellido: string;
  
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Gomez',
        description: 'Segundo apellido del usuario',
        minLength: 1,
        maxLength: 100,
      })
    segundo_apellido: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Trancecode',
        description: 'Nick del usuario',
        minLength: 1,
        maxLength: 100,
      })
    user_name:string;

    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    @IsString()
    @ApiProperty({
        example: '12345678',
        description: 'Contraseña del usuario. Mínimo 8 caracteres',
        minLength: 8,
        maxLength: 100,
      })
    password:string;

    @ApiProperty({
        example: 'aperez@gmail.com',
        description: 'Correo electrónico del usuario.',
        maxLength: 100,
      })
    @IsEmail()
    email:string;
}

