/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuariosService.encontrarPorEmail(email);
    if (user && await bcrypt.compare(password, user.senha)) {
      const { senha, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.validateUser(createAuthDto.email, createAuthDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.usuariosService.criar({
      ...createAuthDto,
      nome: createAuthDto.email.split('@')[0], // Usa parte do email como nome padrão
      senha: hashedPassword,
    });
    return this.login(createAuthDto);
  }
}
