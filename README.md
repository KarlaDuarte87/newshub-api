# NewsHub API - Backend

API REST desenvolvida em NestJS para gerenciamento de artigos/notícias, construída como parte do desafio técnico.

## 🚀 Tecnologias Utilizadas

- **NestJS 11** - Framework Node.js progressivo
- **TypeScript** - Tipagem estática
- **Prisma 7** - ORM moderno
- **PostgreSQL 16** - Banco de dados relacional
- **Jest** - Framework de testes

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker e Docker Compose (para banco de dados)
- PostgreSQL 16+ (se não usar Docker)

## 🛠️ Instalação e Execução

### 1. Configuração do Banco de Dados

O projeto inclui um `docker-compose.yml` para facilitar a configuração:

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL na porta 5434.

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://gpcom:gpcom@localhost:5434/gpcom?schema=public"
```

### 3. Instalação e Setup

```bash
# Instale as dependências
npm install

# Gere o Prisma Client
npm run prisma:generate

# Execute as migrações
npm run prisma:migrate

# Popule o banco com dados iniciais (seed)
npm run prisma:seed
```

### 4. Executar a API

```bash
# Modo desenvolvimento (watch mode)
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

A API estará disponível em: `http://localhost:3001`

## 📦 Scripts Disponíveis

- `npm run start:dev` - Inicia em modo desenvolvimento com watch
- `npm run build` - Compila o projeto
- `npm run start:prod` - Inicia em modo produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa testes unitários
- `npm run test:cov` - Executa testes com coverage
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa migrações
- `npm run prisma:seed` - Popula o banco com dados iniciais

## 🏗️ Estrutura do Projeto

```
src/
├── modules/
│   └── posts/             # Módulo de posts
│       ├── posts.controller.ts    # Controller REST
│       ├── posts.service.ts       # Lógica de negócio
│       ├── posts.module.ts        # Módulo NestJS
│       └── *.spec.ts              # Testes unitários
├── prisma/
│   ├── prisma.service.ts  # Serviço Prisma
│   └── prisma.module.ts   # Módulo Prisma
├── app.module.ts          # Módulo raiz
└── main.ts                # Entry point

prisma/
├── schema.prisma          # Schema do banco de dados
├── seed.ts                # Script de seed
└── migrations/            # Migrações do banco
```

## 🎨 Decisões de Arquitetura

### Escolha do NestJS
Optei pelo NestJS porque:
- Arquitetura modular e escalável
- TypeScript nativo
- Decorators e dependency injection facilitam a organização
- Padrões sólidos de desenvolvimento (SOLID)
- Excelente para APIs REST

### Prisma como ORM
Escolhido por:
- Type-safe queries com TypeScript
- Migrations automáticas
- Developer experience superior
- Schema-first approach (schema.prisma)
- Suporte moderno a PostgreSQL

### PostgreSQL
Banco relacional escolhido por:
- Robusto e confiável
- Excelente performance
- Suporte completo a relacionamentos
- Adequado para conteúdo estruturado

### Estrutura Modular
- Separação por domínios (posts)
- Controller → Service → Repository (Prisma)
- Testes unitários por módulo
- Fácil adicionar novos módulos

## 📊 Modelo de Dados

O schema Prisma define o modelo `posts`:

```prisma
model posts {
  id          Int       @id @default(autoincrement())
  slug        String?   @unique
  title       String
  summary     String?
  content     String    @db.Text
  author      String?
  category    String?
  image_url   String?
  publish_date String?
  createdAt   DateTime  @default(now())
  changedAt   DateTime  @updatedAt
}
```

## 🔌 Endpoints da API

### GET /posts
Retorna lista de todos os posts ordenados por data de publicação (mais recentes primeiro).

**Resposta:**
```json
[
  {
    "id": "1",
    "slug": "exemplo-artigo",
    "title": "Título do Artigo",
    "summary": "Resumo do artigo...",
    "content": "<p>Conteúdo HTML...</p>",
    "author": "Nome do Autor",
    "publishDate": "27 de Dezembro de 2024",
    "category": "Tecnologia",
    "imageUrl": "https://..."
  }
]
```

### GET /posts/:slug
Retorna um post específico pelo slug.

**Resposta:**
```json
{
  "id": "1",
  "slug": "exemplo-artigo",
  "title": "Título do Artigo",
  "summary": "Resumo do artigo...",
  "content": "<p>Conteúdo HTML...</p>",
  "author": "Nome do Autor",
  "publishDate": "27 de Dezembro de 2024",
  "category": "Tecnologia",
  "imageUrl": "https://..."
}
```

**Erro 404:** Se o slug não for encontrado, retorna:
```json
{
  "statusCode": 404,
  "message": "Artigo com slug \"exemplo\" não encontrado"
}
```

## 🔒 CORS

A API está configurada para aceitar requisições de qualquer origem em desenvolvimento. Em produção, deve-se configurar as origens permitidas no `main.ts`.

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar com coverage
npm run test:cov

# Watch mode
npm run test:watch
```

Testes unitários implementados para:
- **PostsController** - Endpoints GET /posts e GET /posts/:slug
- **PostsService** - Lógica de negócio, formatação de dados e tratamento de erros
- Validação de retorno de dados no formato correto
- Tratamento de NotFoundException quando post não existe
- Mock do PrismaService para testes isolados

## 📝 Seed (Dados Iniciais)

O script de seed cria 3 artigos de exemplo no banco de dados:

```bash
npm run prisma:seed
```

Os dados incluem artigos sobre Tecnologia, Economia e Sustentabilidade.

## 🔧 Configuração do Banco de Dados

### Usando Docker (Recomendado)
```bash
docker-compose up -d
```

### Usando PostgreSQL Local
1. Instale PostgreSQL 16+
2. Crie um banco de dados
3. Configure a `DATABASE_URL` no `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

## 🚢 Deploy

Para produção:
1. Configure variáveis de ambiente adequadas
2. Execute `npm run build`
3. Execute `npm run start:prod`
4. Certifique-se que o banco de dados está acessível

## 📝 Notas Adicionais

- A API usa Prisma com adapter PostgreSQL para melhor performance
- Migrations são versionadas e versionadas no Git
- CORS está habilitado para desenvolvimento local
- Error handling padrão do NestJS para respostas consistentes
