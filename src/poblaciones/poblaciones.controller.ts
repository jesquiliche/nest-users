import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoblacionesService } from './poblaciones.service';
import { CreatePoblacioneDto } from './dto/create-poblacione.dto';
import { UpdatePoblacioneDto } from './dto/update-poblacione.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poblacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoblacioneDto: UpdatePoblacioneDto) {
    return this.poblacionesService.update(+id, updatePoblacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poblacionesService.remove(+id);
  }
}
