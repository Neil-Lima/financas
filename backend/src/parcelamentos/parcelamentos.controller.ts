// src/parcelamentos/parcelamentos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcelamentosService } from './parcelamentos.service';
import { CriarParcelamentoDto } from './dto/criar-parcelamento.dto';

@Controller('parcelamentos')
export class ParcelamentosController {
  constructor(private readonly parcelamentosService: ParcelamentosService) {}

  @Post()
  criar(@Body() criarParcelamentoDto: CriarParcelamentoDto) {
    return this.parcelamentosService.criar(criarParcelamentoDto);
  }

  @Get()
  encontrarTodos() {
    return this.parcelamentosService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.parcelamentosService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarParcelamentoDto: Partial<CriarParcelamentoDto>) {
    return this.parcelamentosService.atualizar(id, atualizarParcelamentoDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.parcelamentosService.remover(id);
  }
}
