// src/orcamentos/orcamentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orcamento } from './entities/orcamento.entity';
import { CriarOrcamentoDto } from './dto/criar-orcamento.dto';

@Injectable()
export class OrcamentosService {
  constructor(@InjectModel(Orcamento.name) private orcamentoModel: Model<Orcamento>) {}

  async criar(criarOrcamentoDto: CriarOrcamentoDto): Promise<Orcamento> {
    const novoOrcamento = new this.orcamentoModel(criarOrcamentoDto);
    return novoOrcamento.save();
  }

  async encontrarTodos(): Promise<Orcamento[]> {
    return this.orcamentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Orcamento> {
    return this.orcamentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarOrcamentoDto: Partial<CriarOrcamentoDto>): Promise<Orcamento> {
    return this.orcamentoModel.findByIdAndUpdate(id, atualizarOrcamentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Orcamento> {
    return this.orcamentoModel.findByIdAndDelete(id).exec();
  }
}
