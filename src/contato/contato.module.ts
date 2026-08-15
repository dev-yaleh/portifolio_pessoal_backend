import { Module } from '@nestjs/common';
import { ContatoService } from './services/contato.service';
import { ContatoController } from './controllers/contato.controller';

@Module({
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}