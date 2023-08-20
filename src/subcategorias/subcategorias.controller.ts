import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';

import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';

@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}
  

  @Post()
  create(@Body() createSubcategoriaDto: CreateSubcategoriaDto) {
    return this.subcategoriasService.create(createSubcategoriaDto);
  }

  @Get()
  findAll() {
    return this.subcategoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriasService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoriaDto: UpdateSubcategoriaDto) {
    return this.subcategoriasService.update(+id, updateSubcategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriasService.remove(+id);
  }
}
