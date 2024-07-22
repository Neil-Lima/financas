/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contas')
export class ContasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 50, nullable: false })
  banco: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  saldo: number;

  @Column({ length: 100, nullable: true })
  descricao: string;

  @Column({ type: 'boolean', default: true })
  ativa: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
