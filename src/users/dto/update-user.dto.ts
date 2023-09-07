import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude, Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   
    @IsOptional()
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
    name?: string;
  
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Perez',
        description: 'Primer apellido del usuario',
        minLength: 1,
        maxLength: 100,
      })
    primer_apellido?: string;
  
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Gomez',
        description: 'Segundo apellido del usuario',
        minLength: 1,
        maxLength: 100,
      })
    segundo_apellido?: string;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        example: 'Trancecode',
        description: 'Nick del usuario',
        minLength: 1,
        maxLength: 100,
      })
    user_name?:string;

    @IsOptional()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    @IsString()
    @ApiProperty({
        example: '12345678',
        description: 'Contraseña del usuario. Mínimo 8 caracteres',
        minLength: 8,
        maxLength: 100,
      })
    password?:string;
  
    @Exclude() // Excluye el campo "email" de la transformación
    email: string;
}
