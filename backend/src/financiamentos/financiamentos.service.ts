// src/financiamentos/financiamentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Financiamento } from './entities/financiamento.entity';
import { CriarFinanciamentoDto } from './dto/criar-financiamento.dto';

@Injectable()
export class FinanciamentosService {
  constructor(@InjectModel(Financiamento.name) private financiamentoModel: Model<Financiamento>) {}

  async criar(criarFinanciamentoDto: CriarFinanciamentoDto): Promise<Financiamento> {
    const novoFinanciamento = new this.financiamentoModel(criarFinanciamentoDto);
    return novoFinanciamento.save();
  }

  async encontrarTodos(): Promise<Financiamento[]> {
    return this.financiamentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Financiamento> {
    return this.financiamentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarFinanciamentoDto: Partial<CriarFinanciamentoDto>): Promise<Financiamento> {
    return this.financiamentoModel.findByIdAndUpdate(id, atualizarFinanciamentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Financiamento> {
    return this.financiamentoModel.findByIdAndDelete(id).exec();
  }
}
