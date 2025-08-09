# User Management API

API de gestão de utilizadores construída com **NestJS** e **PostgreSQL**.

## Funcionalidades
- Criar utilizador
- Listar utilizadores
- Atualizar utilizador
- Remover utilizador
- Autenticação com JWT

## Tecnologias
- Node.js
- NestJS
- PostgreSQL
- TypeORM
- JWT
- Bcrypt

## Instalação
```bash
npm install

Executar:

npm run start:dev

Endpoints principais:

POST /users — Cria um utilizador

GET /users — Lista utilizadores (necessário token)

POST /auth/login — Login e obtenção de token