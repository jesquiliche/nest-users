import { Injectable } from '@nestjs/common';
import { Provincia } from './entities/provincia.entity';
import { provincias } from 'src/data/provincias';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciasService {
  
    constructor(
      @InjectRepository(Provincia)
      private provinciasRepository: Repository<Provincia>,
    ) {}

    async findAll() {
      return await this.provinciasRepository
        .createQueryBuilder('provincia')
        .orderBy('provincia.nombre', 'ASC')
        .getMany();
    }

  async poblar(): Promise<any> {
    for (const data of provincias) {
      await this.provinciasRepository.save(this.provinciasRepository.create(data));
    }
    return 'Provincias insertadas correctamente';
  }
}
