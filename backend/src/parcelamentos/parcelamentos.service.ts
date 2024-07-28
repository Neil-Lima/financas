// src/parcelamentos/parcelamentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parcelamento } from './entities/parcelamento.entity';
import { CriarParcelamentoDto } from './dto/criar-parcelamento.dto';

@Injectable()
export class ParcelamentosService {
  constructor(@InjectModel(Parcelamento.name) private parcelamentoModel: Model<Parcelamento>) {}

  async criar(criarParcelamentoDto: CriarParcelamentoDto): Promise<Parcelamento> {
    const novoParcelamento = new this.parcelamentoModel(criarParcelamentoDto);
    return novoParcelamento.save();
  }

  async encontrarTodos(): Promise<Parcelamento[]> {
    return this.parcelamentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Parcelamento> {
    return this.parcelamentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarParcelamentoDto: Partial<CriarParcelamentoDto>): Promise<Parcelamento> {
    return this.parcelamentoModel.findByIdAndUpdate(id, atualizarParcelamentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Parcelamento> {
    return this.parcelamentoModel.findByIdAndDelete(id).exec();
  }
}
