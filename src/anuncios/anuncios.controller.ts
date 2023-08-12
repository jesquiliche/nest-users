import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';

@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto) {
    return this.anunciosService.create(createAnuncioDto);
  }

  @Get()
  findAll() {
    return this.anunciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anunciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto) {
    return this.anunciosService.update(+id, updateAnuncioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anunciosService.remove(+id);
  }
}
