import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContatoDto } from '../dto/contato.dto';
import { ContatoService } from '../services/contato.service';

@ApiTags('Contato')
@Controller('/contato')
export class ContatoController {
  constructor(private contatoService: ContatoService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 mensagens por minuto por IP
  @HttpCode(HttpStatus.OK)
  @Post()
  async enviar(@Body() contato: ContatoDto): Promise<{ message: string }> {
    return await this.contatoService.enviar(contato);
  }
}