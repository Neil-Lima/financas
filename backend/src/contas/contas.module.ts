// src/contas/contas.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { Conta, ContaSchema } from './entities/conta.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conta.name, schema: ContaSchema }])],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
