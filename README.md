# User Management API (NestJS)

API REST para gestão de utilizadores, com autenticação JWT, persistência via TypeORM/SQLite e documentação OpenAPI (Swagger).

## Endpoints principais

| Método | Endpoint | Descrição | Auth |
|---|---|---|---|
| POST | `/users` | Criar utilizador | Público |
| POST | `/auth/login` | Login (JWT) | Público |
| GET | `/users` | Listar utilizadores | JWT |
| GET | `/users/:id` | Detalhe do utilizador | JWT |
| PUT | `/users/:id` | Atualizar utilizador | JWT |
| DELETE | `/users/:id` | Remover utilizador | JWT |
| GET | `/health` | Health check | Público |

## Swagger (OpenAPI)

- UI: `http://localhost:3001/docs`
- Depois de fazer login, clica em **Authorize** e cola `Bearer <token>`.

## Como correr localmente

Pré-requisitos: Node.js 18+ (recomendado 20) e npm.

```bash
npm install

# configura as variáveis de ambiente
copy [.env.example](http://_vscodecontentref_/4) .env

npm run start:dev
```

API: `http://localhost:3001`

## Como correr com Docker

```bash
docker compose up --build
```

Por defeito a base de dados SQLite fica persistida em `./data/database.sqlite`.

## Exemplo rápido (curl)

Criar utilizador (password mínima: 8 chars):

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Wick",
    "username": "johnwick",
    "email": "johnwick@example.com",
    "password": "password1234"
  }'
```

Login:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johnwick",
    "password": "password1234"
  }'
```

Usar token:

```bash
curl http://localhost:3001/users \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Estrutura (alto nível)

```
src/
  auth/   # login + jwt strategy
  user/   # entidade, DTOs, service, controller
  app.module.ts
  main.ts
```

## Scripts

```bash
npm run start:dev
npm run build
npm test
npm run test:e2e
npm run lint
npm run format
```

## Configuração

Variáveis principais (ver `.env.example`):

- `JWT_SECRET` (obrigatório em produção; mínimo 20 chars)
- `JWT_EXPIRES_IN` (default: `1h`)
- `DB_PATH` (default: `database.sqlite`)
- `DB_SYNCHRONIZE` (default: `true`; em produção recomenda-se `false` + migrações)

## Ideias de evolução (roadmap)

- Refresh tokens + logout + rotação de tokens
- RBAC (roles/permissions) e auditoria
- Migrações TypeORM (substituir `synchronize` em produção)
- Paginação + filtros + ordenação para `/users`
- Observabilidade: logging estruturado, tracing, métricas
- Rate limiting e hardening de headers
