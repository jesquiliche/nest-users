import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';


@Entity('poblaciones')
export class Poblacion {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

}
