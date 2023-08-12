import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Anuncio } from 'src/anuncios/entities/anuncio.entity';
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';

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

  @OneToMany(() => Subcategoria, subcategoria => subcategoria.categoria)
  subcategoria: Subcategoria[];
}
