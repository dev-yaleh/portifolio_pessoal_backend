import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projetos } from './entities/projetos.entity';
import { ProjetosController } from './controllers/projetos.controller';
import { ProjetosService } from './services/projetos.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Projetos]), AuthModule],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}