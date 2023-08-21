import { Injectable } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciasService {
  
    constructor(
      @InjectRepository(Provincia)
      private provinciasRepository: Repository<Provincia>,
    ) {}

  create(createProvinciaDto: CreateProvinciaDto) {
    return 'This action adds a new provincia';
  }

  async findAll() {
    return await this.provinciasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} provincia`;
  }

  update(id: number, updateProvinciaDto: UpdateProvinciaDto) {
    return `This action updates a #${id} provincia`;
  }

  remove(id: number) {
    return `This action removes a #${id} provincia`;
  }
}
