import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateDto } from './dto/pagination-dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('anuncios')

@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  // Controlador para crear un nuevo anuncio
  @Post()
  @ApiBearerAuth()
  //mo@ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crea un nuevo anuncio',
    description: 'El anuncio se crea a traves de un form-data',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'client/images'); // Directorio de destino para guardar la imagen
        },
        filename: (req, file, cb) => {
          // Lógica para generar el nombre del archivo
          const fileExtension = extname(file.originalname).toLowerCase();
        
          //Comprobar que es una extensión valiad
          if (!['.jpg', '.jpeg', '.png', '.gif','.webp'].includes(fileExtension)) {
            return cb(new BadRequestException('El archivo debe ser una imagen (jpg, jpeg, webp, png o gif). ' + file.originalname), null);
          }

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          // Genera un nombre único para el archivo cargado
          cb(null, `${randomName}${fileExtension}`);
        },
      }),
      limits: {
        fileSize: 4 * 1024 * 1024, // Tamaño máximo en bytes (4 MB)
      },
    }),
  )
  async create(@Body() createAnuncioDto: CreateAnuncioDto, @UploadedFile() file) {
    // Convierte el precio a número y agrega el nombre del archivo al DTO
    createAnuncioDto.precio = +createAnuncioDto.precio;
    createAnuncioDto.imagen = file.filename; // Asigna el nombre del archivo cargado al DTO
    
    // Llama al servicio para crear un nuevo anuncio
    return await this.anunciosService.create(createAnuncioDto);
  }

  // Controlador para obtener todos los anuncios con opciones de paginación
  
  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los anuncios de la bas datos',
    description: 'Utilice los parámetros limit y page para paginar',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
   async findAll(@Query() query: PaginateDto) {
    return await this.anunciosService.findAll(query);
  }

  // Controlador para obtener un anuncio por ID
  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene un anuncio por su #Id',
    description: 'Obtiene un anuncio por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    return await this.anunciosService.findOne(+id);
  }

  // Controlador para actualizar un anuncio por ID
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Modifica un anuncio por su #Id',
    description: 'Modifica un anuncio por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
    return await this.anunciosService.update(+id, updateAnuncioDto);
  }

  // Controlador para eliminar un anuncio por ID
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra un anuncio por su #Id',
    description: 'Borra un anuncio por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async remove(@Param('id') id: string) {
    return await this.anunciosService.remove(+id);
  }
}
