/* eslint-disable prettier/prettier */
// src/estoque/estoque.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estoque } from './entities/estoque.entity';
import { CriarEstoqueDto } from './dto/create-estoque.dto';


@Injectable()
export class EstoqueService {
  constructor(@InjectModel(Estoque.name) private estoqueModel: Model<Estoque>) {}

  async criar(criarEstoqueDto: CriarEstoqueDto): Promise<Estoque> {
    const novoEstoque = new this.estoqueModel(criarEstoqueDto);
    return novoEstoque.save();
  }

  async encontrarTodos(): Promise<Estoque[]> {
    return this.estoqueModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Estoque> {
    return this.estoqueModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarEstoqueDto: Partial<CriarEstoqueDto>): Promise<Estoque> {
    return this.estoqueModel.findByIdAndUpdate(id, atualizarEstoqueDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Estoque> {
    return this.estoqueModel.findByIdAndDelete(id).exec();
  }
}
