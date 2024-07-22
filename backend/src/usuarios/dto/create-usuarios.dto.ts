/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsString()
  @MinLength(2)
  sobrenome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}
