// src/investimentos/investimentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investimento } from './entities/investimento.entity';
import { CriarInvestimentoDto } from './dto/criar-investimento.dto';

@Injectable()
export class InvestimentosService {
  constructor(@InjectModel(Investimento.name) private investimentoModel: Model<Investimento>) {}

  async criar(criarInvestimentoDto: CriarInvestimentoDto): Promise<Investimento> {
    const novoInvestimento = new this.investimentoModel(criarInvestimentoDto);
    return novoInvestimento.save();
  }

  async encontrarTodos(): Promise<Investimento[]> {
    return this.investimentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Investimento> {
    return this.investimentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarInvestimentoDto: Partial<CriarInvestimentoDto>): Promise<Investimento> {
    return this.investimentoModel.findByIdAndUpdate(id, atualizarInvestimentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Investimento> {
    return this.investimentoModel.findByIdAndDelete(id).exec();
  }
}
// src/investimentos/investimentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investimento } from './entities/investimento.entity';
import { CriarInvestimentoDto } from './dto/criar-investimento.dto';

@Injectable()
export class InvestimentosService {
  constructor(@InjectModel(Investimento.name) private investimentoModel: Model<Investimento>) {}

  async criar(criarInvestimentoDto: CriarInvestimentoDto): Promise<Investimento> {
    const novoInvestimento = new this.investimentoModel(criarInvestimentoDto);
    return novoInvestimento.save();
  }

  async encontrarTodos(): Promise<Investimento[]> {
    return this.investimentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Investimento> {
    return this.investimentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarInvestimentoDto: Partial<CriarInvestimentoDto>): Promise<Investimento> {
    return this.investimentoModel.findByIdAndUpdate(id, atualizarInvestimentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Investimento> {
    return this.investimentoModel.findByIdAndDelete(id).exec();
  }
}
// src/investimentos/investimentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Investimento } from './entities/investimento.entity';
import { CriarInvestimentoDto } from './dto/criar-investimento.dto';

@Injectable()
export class InvestimentosService {
  constructor(@InjectModel(Investimento.name) private investimentoModel: Model<Investimento>) {}

  async criar(criarInvestimentoDto: CriarInvestimentoDto): Promise<Investimento> {
    const novoInvestimento = new this.investimentoModel(criarInvestimentoDto);
    return novoInvestimento.save();
  }

  async encontrarTodos(): Promise<Investimento[]> {
    return this.investimentoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Investimento> {
    return this.investimentoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarInvestimentoDto: Partial<CriarInvestimentoDto>): Promise<Investimento> {
    return this.investimentoModel.findByIdAndUpdate(id, atualizarInvestimentoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Investimento> {
    return this.investimentoModel.findByIdAndDelete(id).exec();
  }
}
