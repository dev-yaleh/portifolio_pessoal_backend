# 💼 Portfólio Pessoal — Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge\&logo=typeorm\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)

## 📌 Sobre o projeto

Backend desenvolvido para disponibilizar e gerenciar as informações do meu portfólio profissional por meio de uma **API RESTful**.

A aplicação foi construída com **NestJS e TypeScript**, adotando uma arquitetura modular para facilitar a organização, manutenção e evolução do sistema.

O projeto contempla recursos para gerenciamento de **projetos e categorias**, além de uma camada de **autenticação e autorização baseada em JWT**, permitindo separar operações públicas de operações protegidas.

A API foi pensada para atuar como camada de integração entre o backend e uma futura aplicação frontend, centralizando os dados profissionais em uma estrutura organizada e escalável.

---

## 🎯 Objetivos

O projeto tem como principais objetivos:

* Criar uma API REST para disponibilizar informações do portfólio;
* Aplicar conceitos de arquitetura modular utilizando NestJS;
* Implementar autenticação baseada em JWT;
* Trabalhar com persistência de dados utilizando MySQL e TypeORM;
* Implementar validação e transformação de dados;
* Organizar responsabilidades entre Controllers, Services, Entities e Modules;
* Disponibilizar documentação da API;
* Aplicar boas práticas de desenvolvimento backend;
* Criar uma base preparada para integração com aplicações frontend.

---

## 🏗️ Arquitetura

A aplicação utiliza a arquitetura modular do NestJS, separando as principais responsabilidades da aplicação em módulos independentes.

```text
src/
├── auth/
│   ├── bcrypt/
│   ├── controllers/
│   ├── entities/
│   ├── guard/
│   ├── services/
│   ├── strategy/
│   └── auth.module.ts
│
├── categorias/
│   ├── controllers/
│   ├── entities/
│   ├── services/
│   └── categorias.module.ts
│
├── projetos/
│   ├── controllers/
│   ├── entities/
│   ├── services/
│   └── projetos.module.ts
│
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

### 🔐 Auth

Responsável pelo gerenciamento da autenticação da aplicação.

Inclui:

* Estratégia de autenticação;
* JWT;
* Passport;
* Guards;
* Hash de senhas com bcrypt;
* Controllers;
* Services;
* Entities.

### 📂 Categorias

Módulo responsável pelo gerenciamento das categorias utilizadas para organizar os projetos do portfólio.

### 🚀 Projetos

Módulo responsável pelo gerenciamento dos projetos apresentados no portfólio.

A separação entre projetos e categorias permite estruturar o conteúdo de forma mais organizada e facilita sua utilização por diferentes clientes frontend.

---

## 🛠️ Tecnologias utilizadas

### Backend

* **Node.js**
* **NestJS**
* **TypeScript**
* **Express**

### Banco de dados

* **MySQL**
* **TypeORM**
* **MySQL2**

### Autenticação e segurança

* **JWT**
* **Passport**
* **Passport JWT**
* **Passport Local**
* **bcrypt**

### Validação

* **class-validator**
* **class-transformer**

### Documentação

* **Swagger**
* **Swagger UI**

### Qualidade e testes

* **Jest**
* **Supertest**
* **ESLint**
* **Prettier**

As dependências acima são baseadas na configuração atual do projeto.

---

## 🔒 Autenticação

A API utiliza autenticação baseada em **JSON Web Token (JWT)**.

O fluxo geral de autenticação é:

```text
Cliente
   │
   ▼
Login
   │
   ▼
Validação das credenciais
   │
   ▼
Hash da senha
   │
   ▼
JWT
   │
   ▼
Token enviado nas requisições protegidas
   │
   ▼
JWT Guard
   │
   ▼
Controller
```

A estrutura do módulo de autenticação utiliza estratégias, guards, services, controllers e mecanismos de criptografia de senha.

> **Importante:** credenciais, chaves JWT e informações sensíveis não devem ser versionadas no repositório. Utilize variáveis de ambiente para configurações de produção.

---

## 🗄️ Banco de dados

O projeto utiliza **MySQL** como banco de dados relacional e **TypeORM** como camada de persistência.

A comunicação segue o fluxo:

```text
Controller
    ↓
Service
    ↓
TypeORM Repository
    ↓
Entity
    ↓
MySQL
```

Essa abordagem mantém as regras de negócio separadas da camada de apresentação e facilita a manutenção e evolução da aplicação.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

* [Node.js](https://nodejs.org/)
* npm
* MySQL
* Git

Recomenda-se utilizar uma versão LTS do Node.js.

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/dev-yaleh/portifolio_pessoal_backend.git
```

### 2. Entre na pasta

```bash
cd portifolio_pessoal_backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=portfolio

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

> Os nomes das variáveis devem corresponder exatamente aos utilizados na configuração da aplicação.

### 5. Configure o banco de dados

Crie um banco MySQL para a aplicação:

```sql
CREATE DATABASE portfolio;
```

Depois, configure as credenciais no arquivo `.env`.

---

## ▶️ Executando a aplicação

### Desenvolvimento

```bash
npm run start
```

### Desenvolvimento com hot reload

```bash
npm run start:dev
```

### Debug

```bash
npm run start:debug
```

### Produção

Primeiro faça o build:

```bash
npm run build
```

Depois:

```bash
npm run start:prod
```

Os scripts acima estão definidos no `package.json` atual do projeto.

---

## 🧪 Testes

O projeto possui configuração para testes unitários e testes End-to-End.

### Testes unitários

```bash
npm run test
```

### Testes em modo watch

```bash
npm run test:watch
```

### Testes E2E

```bash
npm run test:e2e
```

### Cobertura de testes

```bash
npm run test:cov
```

A configuração atual utiliza Jest, ts-jest e Supertest para suportar a estratégia de testes.

---

## 📚 Documentação da API

O projeto utiliza **Swagger** para documentação e exploração dos endpoints da API.

Após iniciar a aplicação, acesse a rota de documentação configurada no projeto.

Exemplo:

```text
http://localhost:3000/api
```

> Caso a rota de Swagger seja alterada em `main.ts`, utilize a rota definida nessa configuração.

A documentação pode ser utilizada para visualizar endpoints, parâmetros, respostas e testar as requisições diretamente pelo navegador.

---

## 🔌 Principais recursos da API

A API está organizada em módulos de acordo com os domínios da aplicação.

### Autenticação

Responsável pelo cadastro/login e geração/validação de tokens de acesso.

```text
/auth/*
```

### Categorias

Gerenciamento das categorias dos projetos.

```text
/categorias/*
```

### Projetos

Gerenciamento dos projetos apresentados no portfólio.

```text
/projetos/*
```

> Os endpoints exatos e seus métodos HTTP devem ser consultados na documentação Swagger da aplicação.

---

## 📁 Organização de responsabilidades

Uma das decisões arquiteturais do projeto é manter as responsabilidades separadas.

### Controllers

Responsáveis por:

* Receber requisições HTTP;
* Validar parâmetros de entrada;
* Encaminhar as solicitações para os services;
* Retornar as respostas HTTP.

### Services

Responsáveis pela:

* Regra de negócio;
* Comunicação com repositories;
* Manipulação dos dados;
* Orquestração das operações.

### Entities

Representam as estruturas persistidas no banco de dados através do TypeORM.

### Guards

Responsáveis por controlar o acesso a recursos protegidos.

### Strategies

Responsáveis pela implementação das estratégias utilizadas no processo de autenticação.

Essa organização segue a proposta modular do NestJS e facilita a evolução da aplicação.

---

## 🔄 Fluxo geral da aplicação

```text
                 ┌─────────────────┐
                 │    Frontend     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   REST API      │
                 │     NestJS      │
                 └────────┬────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
         Auth         Projetos     Categorias
             │            │            │
             └────────────┼────────────┘
                          ▼
                    ┌───────────┐
                    │ TypeORM   │
                    └─────┬─────┘
                          ▼
                    ┌───────────┐
                    │   MySQL   │
                    └───────────┘
```

---

## 🧹 Qualidade de código

O projeto possui ferramentas voltadas à padronização e qualidade do código.

### ESLint

```bash
npm run lint
```

### Prettier

```bash
npm run format
```

A utilização dessas ferramentas ajuda a manter consistência de estilo e facilita a colaboração e manutenção do código.

---

## 📈 Possíveis evoluções

Como projeto de portfólio, a arquitetura foi construída de forma que novos recursos possam ser incorporados posteriormente.

Entre as possíveis evoluções:

* [ ] Implementação de paginação;
* [ ] Filtros avançados de projetos;
* [ ] Upload de imagens;
* [ ] Sistema de contato;
* [ ] Controle de permissões por perfil;
* [ ] Refresh Token;
* [ ] Rate limiting;
* [ ] Logs estruturados;
* [ ] Dockerização da aplicação;
* [ ] CI/CD;
* [ ] Testes com maior cobertura;
* [ ] Deploy em ambiente cloud;
* [ ] Monitoramento e observabilidade;
* [ ] Versionamento da API.

---

## 💡 Aprendizados

Este projeto foi desenvolvido com foco no aprofundamento de conceitos de desenvolvimento backend, especialmente:

* Desenvolvimento de APIs REST;
* Arquitetura modular;
* NestJS;
* TypeScript;
* ORM e modelagem relacional;
* Autenticação e autorização;
* JWT;
* Criptografia de senhas;
* Validação de dados;
* Documentação de APIs;
* Testes automatizados;
* Organização e manutenção de código.

---

## 👩‍💻 Desenvolvedora

**Yaleh Nóbrega**

Desenvolvedora Full Stack com foco no ecossistema JavaScript/TypeScript e desenvolvimento de aplicações web.

### Tecnologias

```text
JavaScript
TypeScript
React
Node.js
NestJS
MySQL
TypeORM
HTML
CSS
Git
GitHub
```

### Contato

* GitHub: [@dev-yaleh](https://github.com/dev-yaleh)
* LinkedIn: [Yaleh Nóbrega](https://www.linkedin.com/)

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo, portfólio e demonstração de conhecimentos em desenvolvimento de software.

---

⭐ **Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório!**

