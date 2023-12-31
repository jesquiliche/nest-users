import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';

@Entity('subcategorias')
export class Subcategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable:true })
  descripcion?: string;

  @Column({ type: 'text', nullable:true })
  imagen?: string;

  @OneToMany(() => Anuncio, anuncio => anuncio.subcategoria)
  anuncios: Anuncio[];

  @ManyToOne(() =>Categoria, categoria => categoria.subcategoria,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  categoria: Categoria;

  @DeleteDateColumn()
  deletedAt: Date;


}
