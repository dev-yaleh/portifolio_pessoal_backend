import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Admin } from './auth/entities/admin.entity';
import { Projetos } from './projetos/entities/projetos.entity';
import { Categoria } from './categorias/entities/categorias.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'db_portifolio_pessoal',
  entities: [Admin, Projetos, Categoria],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});