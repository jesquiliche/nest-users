import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  
    constructor(
      @InjectRepository(Categoria)
      private categoriasRepository: Repository<Categoria>,
    ) {}
  

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria =this.categoriasRepository.create(createCategoriaDto);
    return await this.categoriasRepository.save(categoria);

  }

  async findAll() {
    return await this.categoriasRepository.find();
  }

  async findOne(id: number) {
    return await this.categoriasRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.categoriasRepository.update(id, updateCategoriaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
