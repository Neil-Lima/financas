import { PartialType } from '@nestjs/mapped-types';
import { CreateParcelamentoDto } from './create-parcelamento.dto';

export class UpdateParcelamentoDto extends PartialType(CreateParcelamentoDto) {}
