// src/contas/contas.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CriarContaDto } from './dto/criar-conta.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  criar(@Body() criarContaDto: CriarContaDto) {
    return this.contasService.criar(criarContaDto);
  }

  @Get()
  encontrarTodos() {
    return this.contasService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.contasService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarContaDto: Partial<CriarContaDto>) {
    return this.contasService.atualizar(id, atualizarContaDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.contasService.remover(id);
  }
}
