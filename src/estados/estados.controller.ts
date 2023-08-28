import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('estados')
@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadosService.update(+id, updateEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }

  
  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  async poblar() {
    await this.estadosService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Estados pobladas exitosamente.' };
  }
}

