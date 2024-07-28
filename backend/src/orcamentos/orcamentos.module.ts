// src/orcamentos/orcamentos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrcamentosService } from './orcamentos.service';
import { OrcamentosController } from './orcamentos.controller';
import { Orcamento, OrcamentoSchema } from './entities/orcamento.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Orcamento.name, schema: OrcamentoSchema }])],
  controllers: [OrcamentosController],
  providers: [OrcamentosService],
})
export class OrcamentosModule {}
