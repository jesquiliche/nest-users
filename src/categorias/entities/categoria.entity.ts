import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm'
import { Subcategoria } from 'src/subcategorias/entities/subcategoria.entity';

@Entity('categorias') // Reemplaza 'tu_tabla' con el nombre de tu tabla real
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Subcategoria, subcategoria => subcategoria.categoria)
  subcategoria: Subcategoria[];
}
