import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoblacioneDto } from './dto/create-poblacione.dto';
import { UpdatePoblacioneDto } from './dto/update-poblacione.dto';
import { Poblacion } from './entities/poblaciones.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { poblacionesData } from 'src/data/poblaciones';

@Injectable()
export class PoblacionesService {

  constructor(
    @InjectRepository(Poblacion)
    private poblacionesRepository: Repository<Poblacion>,
  ) {}

  async create(createPoblacioneDto: CreatePoblacioneDto): Promise<Poblacion> {
    const poblacion = this.poblacionesRepository.create(createPoblacioneDto);
    return await this.poblacionesRepository.save(poblacion);
  }

  async findAll(): Promise<Poblacion[]> {
    return await this.poblacionesRepository.find();
  }

  async findOne(codigo: string): Promise<Poblacion> {
    const poblacion = await this.poblacionesRepository.findOne({
      where: [
        { codigo },
      ]});
    if (!poblacion) {
      throw new NotFoundException(`Población con código ${codigo} no encontrada`);
    }
    return poblacion;
  }

  async update(codigo: string, updatePoblacioneDto: UpdatePoblacioneDto): Promise<Poblacion> {
    const poblacion = await this.poblacionesRepository.preload({
      codigo,
      ...updatePoblacioneDto,
    });
    if (!poblacion) {
      throw new NotFoundException(`Población con código ${codigo} no encontrada`);
    }
    return await this.poblacionesRepository.save(poblacion);
  }

  async remove(codigo: string): Promise<void> {
    const poblacion = await this.poblacionesRepository.findOne({
      where: [
        { codigo },
      ]});
      
    if (!poblacion) {
      throw new NotFoundException(`Población con ID ${codigo} no encontrada`);
    }
    await this.poblacionesRepository.remove(poblacion);
  }

  async poblar(): Promise<any> {
    for (const data of poblacionesData) {
      await this.poblacionesRepository.save(this.poblacionesRepository.create(data));
    }
    return 'Poblaciones insertadas correctamente';
  }
}
