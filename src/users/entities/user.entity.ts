import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany
   } from "typeorm";
import { Anuncio } from "src/anuncios/entities/anuncio.entity";   
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type:'varchar',length:100,nullable:false})
    name: string;
  
    @Column({type:'varchar',length:100,nullable:false})
    primer_apellido: string;
  
    @Column({type:'varchar',length:100,nullable:false})
    segundo_apellido: string;

    @Column({type:'varchar',length:20,nullable:false})
    user_name:string;

    @Column({nullable:false,type:'varchar',length:255, select: false })
    
    password:string;

    @Column({unique:false,nullable:false,type:'varchar',length:100})
    email:string;

    @Column({ default: 'user',length:15,type:'varchar' })
    role: string;

    @OneToMany(() => Anuncio, anuncio => anuncio.user)
    anuncios: Anuncio[];

    @DeleteDateColumn()
    deletedAt: Date;
  }
  