import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('estados')
@ApiBearerAuth()
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crea un estado',
    description: 'Crea un estado de uso asociado a un artículo de un anuncio (Usado,nuevo, etc).',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Devuelve todos los estados disponibles',
    description: 'Devuelve todos los estados disponibles',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll() {
    return await this.estadosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Devuelve un estado determinado por su #Id',
    description: 'Devuelve un estado determinado por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    return await this.estadosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Modifica un estado determinado por su #Id',
    description: 'Modifica un estado determinado por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return await this.estadosService.update(+id, updateEstadoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra un estado determinado por su #Id',
    description: 'Borra un estado determinado por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async  remove(@Param('id') id: string) {
    return await this.estadosService.remove(+id);
  }

  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra un estado determinado por su #Id',
    description: 'Borra un estado determinado por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async poblar() {
    await this.estadosService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Estados pobladas exitosamente.' };
  }
}

