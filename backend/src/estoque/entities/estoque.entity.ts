// src/estoque/entities/estoque.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Estoque extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  nome_produto: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  preco_unitario: number;

  @Prop({ required: true })
  categoria: string;
}

export const EstoqueSchema = SchemaFactory.createForClass(Estoque);
