import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()@
  ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crea una nueva categoría.',
    description: 'Crea una nueva categoría.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las categorias.',
    description: 'Obtiene todas las categorías.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una categoría por su Id.',
    description: 'Obtiene una categoría por su Id.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Get(':id/subcategorias')
  @ApiOperation({
    summary: 'Obtiene todas los subcategorías de una categoría especifica.',
    description: 'Obtiene todas los subcategorías de una categoría especifica.',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado.' })
  async obtenerSubcategoriasDeCategoria(@Param('id') categoriaId: string) {
    try {
      const subcategorias = await this.categoriasService.obtenerSubcategoriasDeCategoria(+categoriaId);
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualiza la categoría con el Id especificado',
    description: 'Actualiza la categoría con el Id especificado',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualiza la categoría con el Id especificado',
    description: 'Actualiza la categoría con el Id especificado',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Recurso no encontrado' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }

  
  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Llama a una rutina que rellena la tabla de Categorías',
    description: 'Llama a una rutina que rellena la tabla de Categorías',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  async poblar() {
    await this.categoriasService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Categorías pobladas exitosamente.' };
  }
}
