// src/financiamentos/dto/criar-financiamento.dto.ts
export class CriarFinanciamentoDto {
  id_usuario: string;
  descricao: string;
  valor_total: number;
  parcelas_restantes: number;
  valor_mensal: number;
  data_inicio: Date;
}
