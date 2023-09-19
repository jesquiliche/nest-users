import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('provincias')
@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

 
  @Get()
  @ApiOperation({
    summary: 'Devuelve todas las provincias de España.',
    description: 'Devuelve todas las provincias de España.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll() {
    return await this.provinciasService.findAll();
  }
 
  @Post('poblar') // Ruta personalizada para poblar las poblaciones
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Rellena la tabla de provincias de manera automática',
    description: 'Rellena la tabla de provincias con todas las provincias de España.',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async poblarProvincias() {
    await this.provinciasService.poblar(); // Llama al método en el servicio para poblar la tabla provincias
    return { message: 'Poblaciones pobladas exitosamente.' };
  }

}
