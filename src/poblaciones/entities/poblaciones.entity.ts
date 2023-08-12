import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';


@Entity('poblaciones')
export class Poblacion {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  codigo: string;

  @OneToMany(() => Anuncio, anuncio => anuncio.poblacion)
  anuncios: Anuncio[];

  @Column({ type: 'varchar', length: 255 })
  nombre: string;


}
