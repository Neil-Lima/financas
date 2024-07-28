// src/financiamentos/financiamentos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinanciamentosService } from './financiamentos.service';
import { FinanciamentosController } from './financiamentos.controller';
import { Financiamento, FinanciamentoSchema } from './entities/financiamento.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Financiamento.name, schema: FinanciamentoSchema }])],
  controllers: [FinanciamentosController],
  providers: [FinanciamentosService],
})
export class FinanciamentosModule {}
