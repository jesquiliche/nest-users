import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foto } from './entities/foto.entity';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';

@Injectable()
export class FotosService {

  constructor(
    @InjectRepository(Foto)
    private fotosRepository: Repository<Foto>,

    @InjectRepository(Anuncio)
    private anunciosRepository: Repository<Anuncio>,

  ) {}

  async create(createFotoDto: CreateFotoDto) {
    const {anuncio_id}=createFotoDto;
    const anuncio= await this.anunciosRepository.findOneBy({id:anuncio_id});

    if(!anuncio){
      throw new BadRequestException(`Anuncio con id ${anuncio_id} no encontrada`);
    }

    const nuevaFoto={
      ...createFotoDto,
      anuncio
    }
    return await this.fotosRepository.save(this.fotosRepository.create(nuevaFoto));
  }

  async findAll() {
    return await this.fotosRepository.find({});
  }

  async findOne(id: number) {
    return await this.fotosRepository.findOneBy({id});
  }


  async findAllByAnuncioId(anuncio_id: number): Promise<Foto[]> {
    return await this.fotosRepository.find({ where: {anuncio_id } });
  }

  async update(id: number, updateFotoDto: UpdateFotoDto) {
    return `This action updates a #${id} foto`;
  }

 async  remove(id: number) {
    return `This action removes a #${id} foto`;
  }
}
