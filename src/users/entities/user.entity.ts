import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn
   } from "typeorm";
   
  
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

    @Column({unique:true,nullable:false,type:'varchar',length:50})
    email:string;

    @Column({ default: 'user',length:15,type:'varchar' })
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;
  }
  