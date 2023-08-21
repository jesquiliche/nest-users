import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity'
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { User } from 'src/users/entities/user.entity';
import { Poblacion } from 'src/poblaciones/entities/poblaciones.entity';
import { Foto } from 'src/fotos/entities/foto.entity';

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

  
  

  @ManyToOne(() => Subcategoria, subcategoria => subcategoria.anuncios,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  subcategoria: Subcategoria;

  @ManyToOne(() => Estado, estado => estado.anuncios,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  estado: Estado;

  @ManyToOne(() => User, user => user.anuncios,{
    // cascade: true,
    eager: true, // para que traiga las raza al hacer un findOne
  })
  user: User;



  @Column({ length: 2 })
  provincia: string;

  @Column({ length: 5 })
  cod_postal: string;

  @ManyToOne(() => Poblacion, poblacion => poblacion.anuncios)
  @JoinColumn({ name: 'cod_postal', referencedColumnName: 'codigo' })
  poblacion: Poblacion;

  @OneToMany(() => Foto, foto => foto.anuncio)
  foto: Foto[];
  
}

