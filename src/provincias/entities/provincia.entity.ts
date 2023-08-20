import { Entity, PrimaryColumn, Column, DeleteDateColumn  } from 'typeorm';

@Entity('provincias')
export class Provincia {
  @PrimaryColumn({ length: 2 })
  codigo: string;

  @Column({ length: 255 })
  nombre: string;

  @DeleteDateColumn()
  deletedAt: Date; 

    // Otras propiedades...
}
