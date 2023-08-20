import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosService {

  constructor(
    @InjectRepository(Estado)
    private estadosRepository: Repository<Estado>,
  ) {}
  
  async create(createEstadoDto: CreateEstadoDto) {
    const estado = this.estadosRepository.create(createEstadoDto);
    return await this.estadosRepository.save(estado);

  }

  async findAll() {
    return await this.estadosRepository.find();
  }

  async findOne(id: number) {
    return await`This action returns a #${id} estado`;
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return this.estadosRepository.findOneBy({ id });
  }
  
  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
