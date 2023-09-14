import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, NotFoundException } from '@nestjs/common';
import { SubcategoriasService } from './subcategorias.service';

import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('subcategorias')
@ApiBearerAuth()
@Controller('subcategorias')
export class SubcategoriasController {
  constructor(private readonly subcategoriasService: SubcategoriasService) {}
  

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crea una nueva subcategoría.',
    description: 'Crea una nueva subcategoría.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() createSubcategoriaDto: CreateSubcategoriaDto) {
    return await this.subcategoriasService.create(createSubcategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las subcategorías.',
    description: 'Obtiene todas las subcategorías .',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll() {
    return await this.subcategoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una subcategoría por su #Id',
    description: 'Obtiene  una subcategoría por su #Id.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.subcategoriasService.findOne(+id);
  }

  @Get('/categoria/:id')
  @ApiOperation({
    summary: 'Obtiene todas las subcategorías asociadas una categoría',
    description: 'Obtiene todas las subcategorías asociadas una categoría por su #Id',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async obtenenerSubacategorias(@Param('id') id:number) {
    return await this.subcategoriasService.obtenerSubcategoriasDeCategoria(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Modifica una subcategoría',
    description: 'Modifica una subcategoria identificada por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Subcategoría no encontrada' })
  @ApiResponse({ status: 400, description: 'Formato de solicitud incorrecto' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(@Param('id') id: string, @Body() updateSubcategoriaDto: UpdateSubcategoriaDto) {
    return await this.subcategoriasService.update(+id, updateSubcategoriaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra una subcategoría',
    description: 'Borra una subcategoria identificada por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 404, description: 'Subcategoría no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return await this.subcategoriasService.remove(+id);
  }

  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Rellena la tabla de subcategorías',
    description: 'Rellena la tabla de subcategorias',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async poblar() {
    await this.subcategoriasService.poblar(); // Llama al método en el servicio para poblar las poblaciones
    return { message: 'Subcategorías pobladas exitosamente.' };
  }
}
