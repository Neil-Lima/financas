/* eslint-disable prettier/prettier */
// src/estoque/estoque.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CriarEstoqueDto } from './dto/create-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  criar(@Body() criarEstoqueDto: CriarEstoqueDto) {
    return this.estoqueService.criar(criarEstoqueDto);
  }

  @Get()
  encontrarTodos() {
    return this.estoqueService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.estoqueService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarEstoqueDto: Partial<CriarEstoqueDto>) {
    return this.estoqueService.atualizar(id, atualizarEstoqueDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.estoqueService.remover(id);
  }
}
