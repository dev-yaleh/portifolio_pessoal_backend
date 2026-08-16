import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categorias/categorias.module';
import { ProjetosModule } from './projetos/projetos.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContatoModule } from './contato/contato.module';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // janela de tempo: 60.000ms = 1 minuto
        limit: 100, // limite GERAL da aplicação: 100 requisições por minuto por IP
      },
    ]),

    TypeOrmModule.forRootAsync({
      useClass:ProdService, // ← aqui você escolhe qual serviço usar (DevService ou ProdService)
      imports: [ConfigModule],
    }),
    CategoriaModule,
    ProjetosModule,
    AuthModule,
    ContatoModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // ← aplica o Throttler em toda a aplicação
    },
  ],
})
export class AppModule {}



/*
Modo cookbook onde a configuração do banco de dados é feita manualmente no arquivo app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categorias/categorias.module';
import { ProjetosModule } from './projetos/projetos.module';
import { Projetos } from './projetos/entities/projetos.entity';
import { Categoria } from './categorias/entities/categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_portifolio_pessoal',
      entities: [Projetos,Categoria],
      synchronize: true,
    }),
    CategoriaModule,
    ProjetosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}*/