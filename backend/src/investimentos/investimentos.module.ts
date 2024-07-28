// src/investimentos/investimentos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestimentosService } from './investimentos.service';
import { InvestimentosController } from './investimentos.controller';
import { Investimento, InvestimentoSchema } from './entities/investimento.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Investimento.name, schema: InvestimentoSchema }])],
  controllers: [InvestimentosController],
  providers: [InvestimentosService],
})
export class InvestimentosModule {}
