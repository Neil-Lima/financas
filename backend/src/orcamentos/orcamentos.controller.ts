// src/orcamentos/orcamentos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { CriarOrcamentoDto } from './dto/criar-orcamento.dto';

@Controller('orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  @Post()
  criar(@Body() criarOrcamentoDto: CriarOrcamentoDto) {
    return this.orcamentosService.criar(criarOrcamentoDto);
  }

  @Get()
  encontrarTodos() {
    return this.orcamentosService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.orcamentosService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarOrcamentoDto: Partial<CriarOrcamentoDto>) {
    return this.orcamentosService.atualizar(id, atualizarOrcamentoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.orcamentosService.remover(id);
  }
}
