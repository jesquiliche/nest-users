import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poblacion } from 'src/poblaciones/entities/poblaciones.entity';
import { poblacionesData } from 'src/data/poblaciones';

@Injectable()
export class PoblacionesSeeder {
  constructor(
    @InjectRepository(Poblacion)
    private poblacionesRepository: Repository<Poblacion>,
  ) {}

  async seedPoblaciones() {
    try {
      for (const data of poblacionesData) {
        const poblacion = this.poblacionesRepository.create({
          codigo: data.codigo,
          nombre: data.nombre,
          cod_provincia: data.codigo.substring(0, 2),
        });

        await this.poblacionesRepository.save(poblacion);
      }

      console.log('Datos de poblaciones cargados exitosamente.');
    } catch (error) {
      console.error('Error durante la carga de datos:', error);
    }
  }
}
