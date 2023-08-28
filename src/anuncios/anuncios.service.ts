import { Injectable } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { Anuncio } from './entities/anuncio.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';
import { Poblacion } from 'src/poblaciones/entities/poblaciones.entity';

@Injectable()
export class AnunciosService {

  constructor(
    @InjectRepository(Anuncio)
    private anunciosRepository: Repository<Anuncio>,

    @InjectRepository(Subcategoria)
    private subcategoriasRepository: Repository<Subcategoria>,

    @InjectRepository(Estado)
    private estadosRepository: Repository<Estado>,

    @InjectRepository(Provincia)
    private provinciasRepository: Repository<Provincia>,

    @InjectRepository(Poblacion)
    private poblacionessRepository: Repository<Poblacion>,

  ) {}

  create(createAnuncioDto: CreateAnuncioDto) {
    return 'This action adds a new anuncio';
  }

  findAll() {
    return `This action returns all anuncios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anuncio`;
  }

  update(id: number, updateAnuncioDto: UpdateAnuncioDto) {
    return `This action updates a #${id} anuncio`;
  }

  remove(id: number) {
    return `This action removes a #${id} anuncio`;
  }
}
