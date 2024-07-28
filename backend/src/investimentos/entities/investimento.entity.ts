// src/investimentos/entities/investimento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Investimento extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  rendimento: number;
}

export const InvestimentoSchema = SchemaFactory.createForClass(Investimento);
// src/investimentos/entities/investimento.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Schema()
export class Investimento extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  rendimento: number;
}

export const InvestimentoSchema = SchemaFactory.createForClass(Investimento);
export class Investimento {}
