/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async criar(criarUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioModel.findOne({ email: criarUsuarioDto.email });
    if (usuarioExistente) {
      throw new ConflictException('Email já existe');
    }
    const usuarioCriado = new this.usuarioModel(criarUsuarioDto);
    return usuarioCriado.save();
  }

  async encontrarTodos(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async encontrarUm(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async atualizar(id: string, atualizarUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioAtualizado = await this.usuarioModel.findByIdAndUpdate(id, atualizarUsuarioDto, { new: true });
    if (!usuarioAtualizado) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuarioAtualizado;
  }

  async remover(id: string): Promise<Usuario> {
    const usuarioRemovido = await this.usuarioModel.findByIdAndDelete(id);
    if (!usuarioRemovido) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuarioRemovido;
  }

  async encontrarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }
}
