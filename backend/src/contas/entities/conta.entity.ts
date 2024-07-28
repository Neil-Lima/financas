// src/contas/entities/conta.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Conta extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  saldo: number;

  @Prop({ required: true })
  categoria: string;
}

export const ContaSchema = SchemaFactory.createForClass(Conta);
