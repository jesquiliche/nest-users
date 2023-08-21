import { Poblacion } from 'src/poblaciones/entities/poblaciones.entity';
import { Entity, PrimaryColumn, Column, DeleteDateColumn, OneToMany  } from 'typeorm';

@Entity('provincias')
export class Provincia {
  @PrimaryColumn({ length: 2 })
  codigo: string;

  @Column({ length: 255 })
  nombre: string;

  @DeleteDateColumn()
  deletedAt: Date; 

  @OneToMany(() => Poblacion, poblacion => poblacion.provincia)
  poblaciones: Poblacion[];

    // Otras propiedades...
}
