import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";



@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_blogpessoal',
            // Caminho dinâmico para as entidades
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            // Se quiser automatizar as migrations também:
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
        
            synchronize: true, // Lembre-se: apenas para desenvolvimento
    };
  }
}