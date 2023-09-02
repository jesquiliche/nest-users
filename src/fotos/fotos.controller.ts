import { Controller, Get, Post, Body, Patch, Param, Delete,Res } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('fotos')
@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post()
  create(@Body() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
  }

  @Get()
  findAll() {
    return this.fotosService.findAll();
  }

  @Get(':filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', 'public/images', filename); // Ruta completa de la imagen
    res.sendFile(imagePath);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotosService.findOne(+id);
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
