import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../entities/admin.entity';
import { AdminLogin } from '../entities/adminlogin.entity';
import { Bcrypt } from '../bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaAdmin = await this.adminRepository.findOne({ where: { username } });

    if (!buscaAdmin)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const senhaValida = await this.bcrypt.compararSenhas(password, buscaAdmin.passwordHash);

    if (buscaAdmin && senhaValida) {
      const { passwordHash, ...resposta } = buscaAdmin;
      return resposta;
    }

    return null;
  }

  async login(adminLogin: AdminLogin) {
    const payload = { sub: adminLogin.username };

    const buscaAdmin = await this.adminRepository.findOne({
      where: { username: adminLogin.username },
    });

    if (!buscaAdmin) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return {
      id: buscaAdmin.id,
      username: buscaAdmin.username,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}