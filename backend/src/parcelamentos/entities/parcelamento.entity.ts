// src/parcelamentos/entities/parcelamento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Parcelamento extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  valor_total: number;

  @Prop({ required: true })
  parcelas_restantes: number;

  @Prop({ required: true })
  valor_mensal: number;

  @Prop({ required: true })
  data_inicio: Date;
}

export const ParcelamentoSchema = SchemaFactory.createForClass(Parcelamento);
