import { Entity, PrimaryColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';


@Entity('poblaciones')
export class Poblacion {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  codigo: string;

  @OneToMany(() => Anuncio, anuncio => anuncio.poblacion)
  anuncios: Anuncio[];

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 2 })
  cod_provincia: string;

  @DeleteDateColumn()
  deletedAt: Date;

}
