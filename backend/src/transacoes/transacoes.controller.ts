// src/transacoes/transacoes.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  criar(@Body() criarTransacaoDto: CriarTransacaoDto) {
    return this.transacoesService.criar(criarTransacaoDto);
  }

  @Get()
  encontrarTodos() {
    return this.transacoesService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.transacoesService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarTransacaoDto: Partial<CriarTransacaoDto>) {
    return this.transacoesService.atualizar(id, atualizarTransacaoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.transacoesService.remover(id);
  }
}
