/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContasModule } from './contas/contas.module';
import { MetasModule } from './metas/metas.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'financas_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ContasModule,
    MetasModule,
    OrcamentosModule,
    TransacoesModule,
    RelatoriosModule,
  ],
})
export class AppModule {}
