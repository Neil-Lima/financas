// src/despesas/despesas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Despesa } from './entities/despesa.entity';
import { CriarDespesaDto } from './dto/criar-despesa.dto';

@Injectable()
export class DespesasService {
  constructor(@InjectModel(Despesa.name) private despesaModel: Model<Despesa>) {}

  async criar(criarDespesaDto: CriarDespesaDto): Promise<Despesa> {
    const novaDespesa = new this.despesaModel(criarDespesaDto);
    return novaDespesa.save();
  }

  async encontrarTodos(): Promise<Despesa[]> {
    return this.despesaModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Despesa> {
    return this.despesaModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarDespesaDto: Partial<CriarDespesaDto>): Promise<Despesa> {
    return this.despesaModel.findByIdAndUpdate(id, atualizarDespesaDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Despesa> {
    return this.despesaModel.findByIdAndDelete(id).exec();
  }
}
// src/despesas/despesas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Despesa } from './entities/despesa.entity';
import { CriarDespesaDto } from './dto/criar-despesa.dto';

@Injectable()
export class DespesasService {
  constructor(@InjectModel(Despesa.name) private despesaModel: Model<Despesa>) {}

  async criar(criarDespesaDto: CriarDespesaDto): Promise<Despesa> {
    const novaDespesa = new this.despesaModel(criarDespesaDto);
    return novaDespesa.save();
  }

  async encontrarTodos(): Promise<Despesa[]> {
    return this.despesaModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Despesa> {
    return this.despesaModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarDespesaDto: Partial<CriarDespesaDto>): Promise<Despesa> {
    return this.despesaModel.findByIdAndUpdate(id, atualizarDespesaDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Despesa> {
    return this.despesaModel.findByIdAndDelete(id).exec();
  }
}
