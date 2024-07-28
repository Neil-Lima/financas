// src/transacoes/entities/transacao.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Transacao extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  data: Date;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true, enum: ['receita', 'despesa'] })
  tipo: string;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);
