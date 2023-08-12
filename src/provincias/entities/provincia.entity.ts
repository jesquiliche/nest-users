import { Entity, PrimaryColumn, Column  } from 'typeorm';

@Entity('provincias')
export class Provincia {
  @PrimaryColumn({ length: 2 })
  codigo: string;

  @Column({ length: 255 })
  nombre: string;

 

    // Otras propiedades...
}
