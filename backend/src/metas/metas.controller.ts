// src/metas/metas.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetasService } from './metas.service';
import { CriarMetaDto } from './dto/criar-meta.dto';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Post()
  criar(@Body() criarMetaDto: CriarMetaDto) {
    return this.metasService.criar(criarMetaDto);
  }

  @Get()
  encontrarTodos() {
    return this.metasService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.metasService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarMetaDto: Partial<CriarMetaDto>) {
    return this.metasService.atualizar(id, atualizarMetaDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.metasService.remover(id);
  }
}
