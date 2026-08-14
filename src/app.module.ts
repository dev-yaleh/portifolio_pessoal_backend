import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categorias/categorias.module';
import { ProjetosModule } from './projetos/projetos.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', 'root'),
        database: config.get<string>('DB_NAME', 'db_portifolio_pessoal'),
        autoLoadEntities: true, // ← carrega todas as Entities automaticamente
        synchronize: true,
      }),
    }),
    CategoriaModule,
    ProjetosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
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