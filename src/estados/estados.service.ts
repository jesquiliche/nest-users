import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private estadosRepository: Repository<Estado>,
  ) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    try {
      const estado = this.estadosRepository.create(createEstadoDto);
      return await this.estadosRepository.save(estado);
    } catch (error) {
      throw new BadRequestException('No se pudo crear el estado');
    }
  }

  async findAll(): Promise<Estado[]> {
    return await this.estadosRepository.find();
  }

  async findOne(id: number): Promise<Estado> {
    const estado=await this.estadosRepository.findOne({
      where: [
        { id },
      ]});

    if (!estado) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }
    return estado;
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    try {
      await this.estadosRepository.update(id, updateEstadoDto);
      const estadoActualizado = await this.estadosRepository.findOne({
        where: [
          { id },
        ]});

      if (!estadoActualizado) {
        throw new NotFoundException(`Estado con ID ${id} no encontrado`);
      }
      return estadoActualizado;
    } catch (error) {
      throw new BadRequestException(`No se pudo actualizar el estado con ID ${id}`);
    }
  }

  async remove(id: number) {
    return await this.estadosRepository.softDelete(id);
  }
}
