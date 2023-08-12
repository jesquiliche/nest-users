import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';

@Entity('categorias') // Reemplaza 'tu_tabla' con el nombre de tu tabla real
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;

}
