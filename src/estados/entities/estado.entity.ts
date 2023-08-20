import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Anuncio, anuncio => anuncio.estado)
  anuncios: Anuncio[];
}
