// src/usuarios/entities/usuario.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop()
  imagem_perfil: string;

  @Prop({ type: Object })
  preferencias: Record<string, any>;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
