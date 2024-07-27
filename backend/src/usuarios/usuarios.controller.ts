/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  criar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criar(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  encontrarTodos() {
    return this.usuariosService.encontrarTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  encontrarUm(@Param('id') id: string) {
    return this.usuariosService.encontrarUm(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.atualizar(id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.usuariosService.remover(id);
  }
}
