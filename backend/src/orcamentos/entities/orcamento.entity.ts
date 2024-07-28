// src/orcamentos/entities/orcamento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Orcamento extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  valor_planejado: number;

  @Prop({ required: true })
  valor_gasto: number;
}

export const OrcamentoSchema = SchemaFactory.createForClass(Orcamento);
