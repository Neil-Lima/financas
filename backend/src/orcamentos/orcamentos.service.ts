import { Injectable } from '@nestjs/common';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';

@Injectable()
export class OrcamentosService {
  create(createOrcamentoDto: CreateOrcamentoDto) {
    return 'This action adds a new orcamento';
  }

  findAll() {
    return `This action returns all orcamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orcamento`;
  }

  update(id: number, updateOrcamentoDto: UpdateOrcamentoDto) {
    return `This action updates a #${id} orcamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} orcamento`;
  }
}
