import { Entity, PrimaryColumn, Column, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Provincia } from 'src/provincias/entities/provincia.entity';


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

  @ManyToOne(() => Provincia, provincia => provincia.poblaciones)
  @JoinColumn({ name: 'cod_provincia', referencedColumnName: 'codigo' })
  provincia: Provincia;


  @DeleteDateColumn()
  deletedAt: Date;

}
