import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

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

  @ManyToOne(() =>Categoria, categoria => categoria.subcategoria,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  categoria: Categoria;

}
