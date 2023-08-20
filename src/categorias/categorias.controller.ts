import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Get(':id/subcategorias')
  async obtenerSubcategoriasDeCategoria(@Param('id') categoriaId: number) {
    try {
      const subcategorias = await this.categoriasService.obtenerSubcategoriasDeCategoria(categoriaId);
      return subcategorias;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Manejo específico para recurso no encontrado
        throw new NotFoundException(error.message);
      }
      // Manejo de otros errores
      throw error;
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
