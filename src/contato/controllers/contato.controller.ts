import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContatoDto } from '../dto/contato.dto';
import { ContatoService } from '../services/contato.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Mensagem } from '../entities/mensagem.entity';

@ApiTags('Contato')
@Controller('/contato')
export class ContatoController {
  constructor(private contatoService: ContatoService) {}

   // Público — qualquer visitante pode enviar
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 mensagens por minuto por IP
  @HttpCode(HttpStatus.OK)
  @Post()
  async enviar(@Body() contato: ContatoDto): Promise<{ message: string }> {
    return await this.contatoService.enviar(contato);
  }

  // Protegido — só o admin pode ver as mensagens recebidas
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Mensagem[]> {
    return await this.contatoService.findAll();
  }

  // Protegido — marcar mensagem como lida
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id/lida')
  @HttpCode(HttpStatus.OK)
  async marcarComoLida(@Param('id', ParseIntPipe) id: number): Promise<Mensagem> {
    return await this.contatoService.marcarComoLida(id);
  }
}