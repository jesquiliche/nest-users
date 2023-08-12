import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @OneToMany(() => Anuncio, anuncio => anuncio.estado)
  anuncios: Anuncio[];
}
