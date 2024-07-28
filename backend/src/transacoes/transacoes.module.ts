// src/transacoes/transacoes.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacoesService } from './transacoes.service';
import { TransacoesController } from './transacoes.controller';
import { Transacao, TransacaoSchema } from './entities/transacao.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transacao.name, schema: TransacaoSchema }])],
  controllers: [TransacoesController],
  providers: [TransacoesService],
})
export class TransacoesModule {}
