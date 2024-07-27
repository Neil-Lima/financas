/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop()
  telefone: string;

  @Prop()
  endereco: string;

  @Prop()
  dataNascimento: Date;

  @Prop()
  profissao: string;

  @Prop({ default: Date.now })
  dataCriacao: Date;

  @Prop({ default: Date.now })
  dataAtualizacao: Date;

  async compararSenha(candidateSenha: string): Promise<boolean> {
    return bcrypt.compare(candidateSenha, this.senha);
  }
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});
