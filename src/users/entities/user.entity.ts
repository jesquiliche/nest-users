import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn
   } from "typeorm";
   import { Exclude } from 'class-transformer';
  
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
    @Exclude({ toPlainOnly: true })
    password:string;

    @Column({unique:true,nullable:false,type:'varchar',length:50})
    email:string;

    @DeleteDateColumn()
    deletedAt: Date;
  }
  