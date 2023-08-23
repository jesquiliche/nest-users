import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';

import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subcategorias')
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

  @Get(':id/subcategporias')
  obtenenerSubacategorias(@Param('id') id:number) {
    return this.subcategoriasService.obtenerSubcategoriasDeCategoria(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoriaDto: UpdateSubcategoriaDto) {
    console.log("Entro");
    return this.subcategoriasService.update(+id, updateSubcategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriasService.remove(+id);
  }

  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  async poblar() {
    await this.subcategoriasService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Subcategorías pobladas exitosamente.' };
  }
}
