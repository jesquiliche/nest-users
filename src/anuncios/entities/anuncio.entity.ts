import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity'
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { Estado } from 'src/estados/entities/estado.entity';

@Entity('anuncios')
export class Anuncio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column('text')
  description: string;

  @Column('text')
  imagen: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ length: 15 })
  telefono: string;

  
  @ManyToOne(() => Categoria, categoria => categoria.id,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })

  @ManyToOne(() => Subcategoria, subcategoria => subcategoria.id,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  subcategoria: Subcategoria;

  @ManyToOne(() => Estado, estado => estado.id,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  estado: Estado;


  @Column({ length: 2 })
  provincia: string;

  @Column({ length: 5 })
  cod_postal: string;
  
}

