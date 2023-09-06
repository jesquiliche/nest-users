import { Controller, Get, Post, Body, Patch, Param, Delete,Res, UploadedFile, ParseFilePipe, UseInterceptors,HttpStatus, BadRequestException } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { diskStorage } from 'multer';
import * as path from 'path'
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';





@ApiTags('fotos')
@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'src/public/images'); // Directorio de destino
        },
        filename: (req, file, cb) => {
          const fileExtension = path.extname(file.originalname).toLowerCase();

          if (!['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
            return cb(new BadRequestException('El archivo debe ser una imagen (jpg, jpeg, png o gif).'),null);
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
    console.log(createFotoDto);
    return await this.fotosService.create(createFotoDto);
  }
 


  @Get()
  findAll() {
    return this.fotosService.findAll();
  }

  @Get('image/:filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', 'public/images', filename); // Ruta completa de la imagen
    res.sendFile(imagePath);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foto=await this.fotosService.findOne(+id);
    if(!foto){
      throw new BadRequestException(`Foto con id ${id} no encontrada`);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoDto: UpdateFotoDto) {
    return this.fotosService.update(+id, updateFotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fotosService.remove(+id);
  }
}
