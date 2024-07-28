// src/despesas/despesas.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CriarDespesaDto } from './dto/criar-despesa.dto';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  criar(@Body() criarDespesaDto: CriarDespesaDto) {
    return this.despesasService.criar(criarDespesaDto);
  }

  @Get()
  encontrarTodos() {
    return this.despesasService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.despesasService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarDespesaDto: Partial<CriarDespesaDto>) {
    return this.despesasService.atualizar(id, atualizarDespesaDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.despesasService.remover(id);
  }
}
// src/despesas/despesas.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CriarDespesaDto } from './dto/criar-despesa.dto';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  criar(@Body() criarDespesaDto: CriarDespesaDto) {
    return this.despesasService.criar(criarDespesaDto);
  }

  @Get()
  encontrarTodos() {
    return this.despesasService.encontrarTodos();
  }

  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.despesasService.encontrarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() atualizarDespesaDto: Partial<CriarDespesaDto>) {
    return this.despesasService.atualizar(id, atualizarDespesaDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.despesasService.remover(id);
  }
}
