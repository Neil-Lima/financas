// src/parcelamentos/dto/criar-parcelamento.dto.ts
export class CriarParcelamentoDto {
  id_usuario: string;
  descricao: string;
  valor_total: number;
  parcelas_restantes: number;
  valor_mensal: number;
  data_inicio: Date;
}
