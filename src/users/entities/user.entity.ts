import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    primer_apellido: string;
  
    @Column()
    segundo_apellido: string;

    @Column()
    user_name:string;

    @Column()
    password:string;

    @Column()
    email:string;

    @DeleteDateColumn()
    deletedAt: Date;
  }
  