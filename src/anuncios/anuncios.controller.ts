import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginateDto } from './dto/pagination-dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@ApiTags('anuncios')
@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  // Controlador para crear un nuevo anuncio
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Crea un nuevo anuncio',
    description: 'El anuncio se crea a traves de un form-data',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'src/public/images'); // Directorio de destino para guardar la imagen
        },
        filename: (req, file, cb) => {
          // Lógica para generar el nombre del archivo
          const fileExtension = extname(file.originalname).toLowerCase();
        
          //Comprobar que es una extensión valiad
          if (!['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
            return cb(new BadRequestException('El archivo debe ser una imagen (jpg, jpeg, png o gif). ' + file.originalname), null);
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
  create(@Body() createAnuncioDto: CreateAnuncioDto, @UploadedFile() file) {
    // Convierte el precio a número y agrega el nombre del archivo al DTO
    createAnuncioDto.precio = +createAnuncioDto.precio;
    createAnuncioDto.imagen = file.filename; // Asigna el nombre del archivo cargado al DTO
    
    // Llama al servicio para crear un nuevo anuncio
    return this.anunciosService.create(createAnuncioDto);
  }

  // Controlador para obtener todos los anuncios con opciones de paginación
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get()
  findAll(@Query() query: PaginateDto) {
    return this.anunciosService.findAll(query);
  }

  // Controlador para obtener un anuncio por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anunciosService.findOne(+id);
  }

  // Controlador para actualizar un anuncio por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
    return this.anunciosService.update(+id, updateAnuncioDto);
  }

  // Controlador para eliminar un anuncio por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anunciosService.remove(+id);
  }
}
