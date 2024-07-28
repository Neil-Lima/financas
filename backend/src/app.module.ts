import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ContasModule } from './contas/contas.module';
import { DespesasModule } from './despesas/despesas.module';
import { FinanciamentosModule } from './financiamentos/financiamentos.module';
import { MetasModule } from './metas/metas.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { ParcelamentosModule } from './parcelamentos/parcelamentos.module';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [UsuariosModule, ContasModule, DespesasModule, FinanciamentosModule, MetasModule, OrcamentosModule, TransacoesModule, InvestimentosModule, ParcelamentosModule, EstoqueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
