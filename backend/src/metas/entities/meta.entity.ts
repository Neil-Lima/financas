// src/metas/entities/meta.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Meta extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  valor_alvo: number;

  @Prop({ required: true })
  valor_atual: number;

  @Prop({ required: true })
  prazo: Date;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
