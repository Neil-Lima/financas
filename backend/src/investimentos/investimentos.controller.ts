// src/investimentos/investimentos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestimentosService } from './investimentos.service';
import { CriarInvestimentoDto } from './dto/criar-investimento.dto';

@Controller('investimentos')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}

  @Post()
  criar(@Body() criarInvestimentoDto: CriarInvestimentoDto) {
    return this.investimentosService.criar(criarInvestimentoDto);
  }

  @Get()
  encontrarTodos() {
    return this.investimentosService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.investimentosService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarInvestimentoDto: Partial<CriarInvestimentoDto>) {
    return this.investimentosService.atualizar(id, atualizarInvestimentoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.investimentosService.remover(id);
  }
}
