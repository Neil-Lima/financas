/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { Usuario } from './entities/usuarios.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existingUser = await this.usuariosRepository.findOne({ where: { email: createUsuarioDto.email } });
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    const newUser = this.usuariosRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
    });

    const savedUser = await this.usuariosRepository.save(newUser);
    const { senha, ...result } = savedUser;
    return result;
  }

  async login(loginData: { email: string; senha: string }) {
    const user = await this.usuariosRepository.findOne({ where: { email: loginData.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginData.senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      nome: user.nome,
    };
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usuariosRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.findOne(id);

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    Object.assign(user, updateUsuarioDto);
    const updatedUser = await this.usuariosRepository.save(user);
    const { senha, ...result } = updatedUser;
    return result;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usuariosRepository.remove(user);
    return { id };
  }
}
