/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  senha: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  dataNascimento?: string;

  @IsString()
  @IsOptional()
  profissao?: string;
}
