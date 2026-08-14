import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'; // ⚠️ do pacote passport-local, não passport-jwt
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(); // sem parâmetros — já usamos username/password, os nomes padrão
  }

  async validate(username: string, password: string): Promise<any> {
    const adminValidado = await this.authService.validateUser(username, password);

    if (!adminValidado) {
      throw new UnauthorizedException('Usuário e/ou senha incorretos!');
    }

    return adminValidado;
  }
}