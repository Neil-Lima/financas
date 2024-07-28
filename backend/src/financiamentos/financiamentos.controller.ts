// src/financiamentos/financiamentos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinanciamentosService } from './financiamentos.service';
import { CriarFinanciamentoDto } from './dto/criar-financiamento.dto';

@Controller('financiamentos')
export class FinanciamentosController {
  constructor(private readonly financiamentosService: FinanciamentosService) {}

  @Post()
  criar(@Body() criarFinanciamentoDto: CriarFinanciamentoDto) {
    return this.financiamentosService.criar(criarFinanciamentoDto);
  }

  @Get()
  encontrarTodos() {
    return this.financiamentosService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.financiamentosService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarFinanciamentoDto: Partial<CriarFinanciamentoDto>) {
    return this.financiamentosService.atualizar(id, atualizarFinanciamentoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.financiamentosService.remover(id);
  }
}
