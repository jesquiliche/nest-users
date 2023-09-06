import { Anuncio } from "src/anuncios/entities/anuncio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('fotos')
export class Foto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable:true })
    path?: string;

    @ManyToOne(() =>Anuncio, anuncio => anuncio.foto,{
        // cascade: true,
        eager: true, 
      })
    anuncio: Anuncio;
}
