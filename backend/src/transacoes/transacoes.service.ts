// src/transacoes/transacoes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao } from './entities/transacao.entity';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private transacaoModel: Model<Transacao>) {}

  async criar(criarTransacaoDto: CriarTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(criarTransacaoDto);
    return novaTransacao.save();
  }

  async encontrarTodos(): Promise<Transacao[]> {
    return this.transacaoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Transacao> {
    return this.transacaoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarTransacaoDto: Partial<CriarTransacaoDto>): Promise<Transacao> {
    return this.transacaoModel.findByIdAndUpdate(id, atualizarTransacaoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Transacao> {
    return this.transacaoModel.findByIdAndDelete(id).exec();
  }
}
// src/transacoes/transacoes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao } from './entities/transacao.entity';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private transacaoModel: Model<Transacao>) {}

  async criar(criarTransacaoDto: CriarTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(criarTransacaoDto);
    return novaTransacao.save();
  }

  async encontrarTodos(): Promise<Transacao[]> {
    return this.transacaoModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Transacao> {
    return this.transacaoModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarTransacaoDto: Partial<CriarTransacaoDto>): Promise<Transacao> {
    return this.transacaoModel.findByIdAndUpdate(id, atualizarTransacaoDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Transacao> {
    return this.transacaoModel.findByIdAndDelete(id).exec();
  }
}
