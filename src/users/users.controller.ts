import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo usuario',
    description: 'Crea un nuevo usuario',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  @ApiResponse({ status: 409, description: 'El email ya esta en uso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Obtiene la lista de usuarios',
    description: 'Obtiene la lista de usuarios',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Obtiene el usuario con el id proporcionado',
    description: 'Obtiene el usuario con el id proporcionado',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualiza el usuario con el id proporcionado',
    description: 'Actualiza el usuario con el id proporcionado',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  @ApiResponse({ status: 409, description: 'El email ya esta en uso' })
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Borra el usuario con el id proporcionado',
    description: 'Borra el usuario con el id proporcionado',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
