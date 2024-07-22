/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { ContasEntity } from './contas.entity';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(ContasEntity)
    private contasRepository: Repository<ContasEntity>,
  ) {}

  async findAll(options?: FindOneOptions<ContasEntity>): Promise<ContasEntity[]> {
    return this.contasRepository.find(options);
  }

  async findOne(options: FindOneOptions<ContasEntity>): Promise<ContasEntity> {
    return this.contasRepository.findOne(options);
  }

  async create(conta: ContasEntity): Promise<ContasEntity> {
    return this.contasRepository.save(conta);
  }

  async update(options: FindOneOptions<ContasEntity>, conta: ContasEntity): Promise<void> {
    await this.contasRepository.update(options, conta);
  }

  async delete(options: FindOneOptions<ContasEntity>): Promise<void> {
    await this.contasRepository.delete(options);
  }
}
