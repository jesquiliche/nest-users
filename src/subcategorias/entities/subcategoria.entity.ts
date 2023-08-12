import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';

@Entity('subcategorias')
export class Subcategoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @OneToMany(() => Anuncio, anuncio => anuncio.subcategoria)
  anuncios: Anuncio[];
}
