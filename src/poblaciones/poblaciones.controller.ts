import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PoblacionesService } from './poblaciones.service';
import { CreatePoblacioneDto } from './dto/create-poblacione.dto';
import { UpdatePoblacioneDto } from './dto/update-poblacione.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('poblaciones')

@Controller('poblaciones')
export class PoblacionesController {
  constructor(private readonly poblacionesService: PoblacionesService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crea una nueva población.',
    description: 'Crea una nueva población.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() createPoblacioneDto: CreatePoblacioneDto) {
    return await this.poblacionesService.create(createPoblacioneDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Devuelve todas las poblaciones.',
    description: 'Devuelve todas las poblaciones.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.poblacionesService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({
    summary: 'Devuelve la población correspondiente al código de la solicitud.',
    description: 'Devuelve la población correspondiente al código de la solicitud.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('codigo') codigo: string) {
    return this.poblacionesService.findOne(codigo);
  }

  @Get('/provincia/:cod_provincia')
  @ApiOperation({
    summary: 'Devuelve todas las poblaciones con el código de provincia correspondiente.',
    description: 'Devuelve todas las poblaciones con el código de provincia correspondiente.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findProv(@Param('cod_provincia') cod_provincia: string) {
    return await this.poblacionesService.findProv(cod_provincia);
  }

  @ApiBearerAuth()
  @Patch(':codigo')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Modifica la población especificada en el código.',
    description: 'Modifica la población especificada en el código.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(@Param('codigo') codigo: string, @Body() updatePoblacioneDto: UpdatePoblacioneDto) {
    return await this.poblacionesService.update(codigo, updatePoblacioneDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra la población por su #Id',
    description: 'Borra la población por su #Id',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('codigo') codigo: string) {
    return await this.poblacionesService.remove(codigo);
  }

  @ApiBearerAuth()
  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Rellena la tabla de poblaciones de manera automática',
    description: 'Rellena la tabla de poblaciones con todas la poblaciones de España. Para ello primero hay que poblar la tabla provinicias.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async poblarPoblaciones() {
    await this.poblacionesService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Poblaciones pobladas exitosamente.' };
  }

}
