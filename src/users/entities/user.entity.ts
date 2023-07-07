
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date_of_birth?:string;

  @Column()
  gender:string;

  @Column()
  cpf:string;

  @Column()
  phone:string;

  @Column()
  email:string;

  @Column()
  password:string;
  
  @Column()
  city:string;

  @Column()
  street:string;

  @Column()
  state:string;

  @Column()
  cep:string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}