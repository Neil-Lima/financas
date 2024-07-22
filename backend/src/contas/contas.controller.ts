/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasEntity } from './contas.entity';
import { FindOneOptions } from 'typeorm';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Get()
  async findAll(@Query() query: FindOneOptions<ContasEntity>): Promise<ContasEntity[]> {
    return this.contasService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContasEntity> {
    return this.contasService.findOne({ where: { id } });
  }

  @Post()
  async create(@Body() conta: ContasEntity): Promise<ContasEntity> {
    return this.contasService.create(conta);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() conta: ContasEntity): Promise<ContasEntity> {
    await this.contasService.update({ id }, conta);
    return this.contasService.findOne({ where: { id } });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.contasService.delete({ id });
  }
}
