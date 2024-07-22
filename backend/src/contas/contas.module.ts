/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasController } from './contas.controller';
import { ContasService } from './contas.service';
import { ContasEntity } from './contas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContasEntity])],
  controllers: [ContasController],
  providers: [ContasService],
  exports: [ContasService],
})
export class ContasModule {}
