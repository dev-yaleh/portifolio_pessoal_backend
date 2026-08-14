import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../src/auth/entities/admin.entity';

describe('Testes dos Módulos Projetos e Auth (e2e)', () => {
  let token: string;
  let projetoId: number;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Como não temos endpoint de cadastro de admin via API,
    // inserimos um admin de teste direto no banco em memória.
    const adminRepository: Repository<Admin> = moduleFixture.get(
      getRepositoryToken(Admin),
    );

    const passwordHash = await bcrypt.hash('admin123', 10);
    await adminRepository.save({
      username: 'admin_teste',
      passwordHash,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  // Os testes de verdade vêm aqui embaixo, no Passo 02
  it('01 - Deve autenticar o Admin (login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin_teste',
        password: 'admin123',
      })
      .expect(200);

    token = resposta.body.token;
  });

  it('02 - Não deve autenticar com senha incorreta', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin_teste',
        password: 'senha_errada',
      })
      .expect(401);
  });

  it('03 - Não deve criar projeto sem token', async () => {
    await request(app.getHttpServer())
      .post('/projetos')
      .send({
        name: 'Projeto sem token',
        description: 'Não deveria ser criado',
        techs: [],
        images: [],
        videos: [],
      })
      .expect(401);
  });

  it('04 - Deve criar um projeto com token válido', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/projetos')
      .set('Authorization', `${token}`)
      .send({
        name: 'Portfólio Pessoal',
        description: 'Projeto criado durante o teste automatizado',
        techs: ['NestJS', 'TypeORM'],
        images: [],
        videos: [],
        liveLink: '',
        repoLink: '',
        featured: false,
        order: 0,
      })
      .expect(201);

    projetoId = resposta.body.id;
  });

  it('05 - Deve listar todos os projetos (rota pública)', async () => {
    return request(app.getHttpServer())
      .get('/projetos')
      .send({})
      .expect(200);
  });

  it('06 - Deve atualizar um projeto com token válido', async () => {
    return request(app.getHttpServer())
      .put('/projetos')
      .set('Authorization', `${token}`)
      .send({
        id: projetoId,
        name: 'Portfólio Pessoal Atualizado',
        description: 'Descrição atualizada no teste',
        techs: ['NestJS', 'TypeORM', 'MySQL'],
        images: [],
        videos: [],
        liveLink: '',
        repoLink: '',
        featured: true,
        order: 1,
      })
      .expect(200)
      .then((resposta) => {
        expect('Portfólio Pessoal Atualizado').toEqual(resposta.body.name);
      });
  });

  it('07 - Deve remover um projeto com token válido', async () => {
    return request(app.getHttpServer())
      .delete(`/projetos/${projetoId}`)
      .set('Authorization', `${token}`)
      .expect(204);
  });
});