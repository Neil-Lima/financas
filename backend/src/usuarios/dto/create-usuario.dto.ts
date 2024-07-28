// src/usuarios/dto/criar-usuario.dto.ts
export class CriarUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  imagem_perfil?: string;
  preferencias?: Record<string, any>;
}
