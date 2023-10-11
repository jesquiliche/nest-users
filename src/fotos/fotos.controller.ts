import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete,Res, UploadedFile, ParseFilePipe, UseInterceptors,HttpStatus, BadRequestException } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('fotos')
@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Sube una foto asociada a anuncio al servidor',
    description: 'Sube una foto asociada a anuncio al servidor',
  })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'client/images'); // Directorio de destino
        },
        filename: (req, file, cb) => {
          const fileExtension = path.extname(file.originalname).toLowerCase();

          if (!['.jpg', '.jpeg', '.png', '.gif','webp'].includes(fileExtension)) {
            return cb(new BadRequestException('El archivo debe ser una imagen (jpg, jpeg, png, webp o gif).'),null);
          }

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${fileExtension}`);
        },
      }),
      limits: {
        fileSize: 4 * 1024 * 1024, // Tamaño máximo en bytes (4 MB)
      },
    }),
  )
  async uploadFile(@Body() createFotoDto:CreateFotoDto, @UploadedFile() file) {
    // Continúa con el procesamiento si el archivo es una imagen válida
    
    createFotoDto.path=file.filename;
    return await this.fotosService.create(createFotoDto);
  }
 


  @Get()
  @ApiOperation({
    summary: 'Devuelve todas las fotos',
    description: 'Devuelve todas las fotos',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findAll() {
    return await this.fotosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una foto por su #Id',
    description: 'Obtiene una foto por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOne(@Param('id') id: string) {
    const foto=await this.fotosService.findOne(+id);
    if(!foto){
      throw new BadRequestException(`Foto con id ${id} no encontrada`);
    }
  }

  @Get('/anuncio/:anuncio_id')
  @ApiOperation({
    summary: 'Obtiene todas las fotos de un anuncio',
    description: 'Obtiene todas las fotos de un anuncio',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async findOneByAnuncio(@Param('anuncio_id') anuncio_id: string) {
    const fotos=await this.fotosService.findAllByAnuncioId(+anuncio_id);
    if(!fotos){
      throw new BadRequestException(`Foto de anuncio id ${anuncio_id} no encontradas`);
    }
    return fotos;
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Borra una foto identificada por su #Id',
    description: 'Borra una foto identificada por su #Id',
  })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: String })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotosService.remove(+id);
  }
}
