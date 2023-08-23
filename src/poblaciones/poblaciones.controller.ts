import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoblacionesService } from './poblaciones.service';
import { CreatePoblacioneDto } from './dto/create-poblacione.dto';
import { UpdatePoblacioneDto } from './dto/update-poblacione.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('poblaciones')
@Controller('poblaciones')
export class PoblacionesController {
  constructor(private readonly poblacionesService: PoblacionesService) {}

  @Post()
  create(@Body() createPoblacioneDto: CreatePoblacioneDto) {
    return this.poblacionesService.create(createPoblacioneDto);
  }

  @Get()
  findAll() {
    return this.poblacionesService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.poblacionesService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updatePoblacioneDto: UpdatePoblacioneDto) {
    return this.poblacionesService.update(codigo, updatePoblacioneDto);
  }

  @Delete(':id')
  remove(@Param('codigo') codigo: string) {
    return this.poblacionesService.remove(codigo);
  }

  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  async poblarPoblaciones() {
    await this.poblacionesService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Poblaciones pobladas exitosamente.' };
  }

}
