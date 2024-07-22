/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  senha: string;
}
