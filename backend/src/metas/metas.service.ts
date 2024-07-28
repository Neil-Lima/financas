// src/metas/metas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meta } from './entities/meta.entity';
import { CriarMetaDto } from './dto/criar-meta.dto';

@Injectable()
export class MetasService {
  constructor(@InjectModel(Meta.name) private metaModel: Model<Meta>) {}

  async criar(criarMetaDto: CriarMetaDto): Promise<Meta> {
    const novaMeta = new this.metaModel(criarMetaDto);
    return novaMeta.save();
  }

  async encontrarTodos(): Promise<Meta[]> {
    return this.metaModel.find().populate('id_usuario').exec();
  }

  async encontrarUm(id: string): Promise<Meta> {
    return this.metaModel.findById(id).populate('id_usuario').exec();
  }

  async atualizar(id: string, atualizarMetaDto: Partial<CriarMetaDto>): Promise<Meta> {
    return this.metaModel.findByIdAndUpdate(id, atualizarMetaDto, { new: true }).exec();
  }

  async remover(id: string): Promise<Meta> {
    return this.metaModel.findByIdAndDelete(id).exec();
  }
}
