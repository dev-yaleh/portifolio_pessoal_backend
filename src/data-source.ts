import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'db_portifolio_pessoal',
  //Global entities and migrations paths (para não esquecer nenhuma entidade ou migration)
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});