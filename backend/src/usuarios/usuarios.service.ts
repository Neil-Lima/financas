/* eslint-disable prettier/prettier */
// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async criar(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const senhaHash = await bcrypt.hash(criarUsuarioDto.senha, 10);
    const novoUsuario = new this.usuarioModel({
      ...criarUsuarioDto,
      senha: senhaHash,
    });
    return novoUsuario.save();
  }

  async encontrarTodos(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async encontrarUm(id: string): Promise<Usuario> {
    return this.usuarioModel.findById(id).exec();
  }

  async atualizar(id: string, atualizarUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if (atualizarUsuarioDto.senha) {
      atualizarUsuarioDto.senha = await bcrypt.hash(atualizarUsuarioDto.senha, 10);
    }
    return this.usuarioModel.findByIdAndUpdate(id, atualizarUsuarioDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Usuario> {
    return this.usuarioModel.findByIdAndDelete(id).exec();
  }
}
