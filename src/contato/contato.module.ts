import { Module } from '@nestjs/common';
import { ContatoService } from './services/contato.service';
import { ContatoController } from './controllers/contato.controller';
import { Mensagem } from './entities/mensagem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem])],
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}