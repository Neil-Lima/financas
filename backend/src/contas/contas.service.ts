// src/contas/contas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conta } from './entities/conta.entity';
import { CriarContaDto } from './dto/criar-conta.dto';

@Injectable()
export class ContasService {
  constructor(@InjectModel(Conta.name) private contaModel: Model<Conta>) {}

  async criar(criarContaDto: CriarContaDto): Promise<Conta> {
    const novaConta = new this.contaModel(criarContaDto);
    return novaConta.save();
  }

  async encontrarTodos(): Promise<Conta[]> {
    return this.contaModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Conta> {
    return this.contaModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarContaDto: Partial<CriarContaDto>): Promise<Conta> {
    return this.contaModel.findByIdAndUpdate(id, atualizarContaDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Conta> {
    return this.contaModel.findByIdAndDelete(id).exec();
  }
}
