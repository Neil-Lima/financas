import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanciamentoDto } from './create-financiamento.dto';

export class UpdateFinanciamentoDto extends PartialType(CreateFinanciamentoDto) {}
