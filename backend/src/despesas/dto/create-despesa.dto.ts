// src/despesas/dto/criar-despesa.dto.ts
export class CriarDespesaDto {
  id_usuario: string;
  descricao: string;
  valor: number;
  data: Date;
  categoria: string;
}
