// src/transacoes/dto/criar-transacao.dto.ts
export class CriarTransacaoDto {
  id_usuario: string;
  data: Date;
  descricao: string;
  valor: number;
  categoria: string;
  tipo: 'receita' | 'despesa';
}
