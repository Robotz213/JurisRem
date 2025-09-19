# JurisREM - Sistema de Gestão Processual

Sistema de gestão de processos jurídicos desenvolvido com Vue 3, TypeScript e seguindo os princípios de Domain Driven Design (DDD).

## 🚀 Funcionalidades Implementadas

### MVP - Gestão de Processos

- **Listagem de Processos**: Visualização de todos os processos com filtros e paginação
- **Detalhes do Processo**: Visualização completa com movimentações e documentos
- **Criação de Processo**: Formulário para criar novos processos
- **Edição de Processo**: Atualização de processos existentes
- **Movimentações**: Histórico cronológico de atualizações do processo
- **Documentos**: Upload e download de arquivos anexados aos processos

## 🏗️ Arquitetura DDD

O projeto segue os princípios de Domain Driven Design com a seguinte estrutura:

### Domain Layer (`src/domain/`)
- **Entities**: Entidades de domínio (Processo, Movimentacao, Documento)
- **Value Objects**: Enums para status, tipos e categorias
- **Business Rules**: Regras de negócio encapsuladas nas entidades

### Infrastructure Layer (`src/infrastructure/`)
- **API Client**: Cliente HTTP com axios e interceptadores
- **DTOs**: Data Transfer Objects para comunicação com API
- **Configuration**: Configurações de API e endpoints

### Application Layer (`src/application/`)
- **Services**: Serviços de aplicação que coordenam operações
- **Mappers**: Conversão entre DTOs e entidades de domínio
- **Use Cases**: Casos de uso implementados nos serviços

### Presentation Layer (`src/app/`)
- **Components**: Componentes Vue para interface do usuário
- **Stores**: Gerenciamento de estado com Pinia
- **Views**: Páginas e layouts da aplicação

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Vue 3, TypeScript, Bootstrap 5, PrimeVue
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Routing**: Vue Router
- **Build Tool**: Vite
- **CSS Framework**: Bootstrap + Custom CSS

## 🔧 Configuração

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```env
# URL base da API JurisREM
VITE_API_BASE_URL=http://localhost:3000/api
```

### Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Interface do Usuário

### Navegação
- **Dashboard**: Visão geral e acesso rápido
- **Processos**: Lista de todos os processos
- **Novo Processo**: Formulário de criação

### Funcionalidades da Interface
- **Filtros**: Busca por título, número, cliente, status e tipo
- **Paginação**: Carregamento incremental de processos
- **Cards Responsivos**: Layout adaptável para diferentes telas
- **Timeline**: Visualização cronológica de movimentações
- **Upload**: Interface drag-and-drop para documentos

## 🔄 Integração com API

### Endpoints Esperados

```typescript
// Processos
GET    /api/processos              // Listar processos
POST   /api/processos              // Criar processo
GET    /api/processos/:id          // Obter processo
PUT    /api/processos/:id          // Atualizar processo
DELETE /api/processos/:id          // Deletar processo

// Movimentações
GET    /api/processos/:id/movimentacoes  // Listar movimentações
POST   /api/movimentacoes               // Criar movimentação
DELETE /api/movimentacoes/:id           // Deletar movimentação

// Documentos
GET    /api/processos/:id/documentos    // Listar documentos
POST   /api/documentos                  // Upload documento
GET    /api/documentos/:id/download     // Download documento
DELETE /api/documentos/:id              // Deletar documento
```

### Formato dos Dados

Ver arquivos de DTOs em `src/infrastructure/api/dtos.ts` para o formato completo dos dados.

## 🎯 Próximos Passos

1. **Autenticação**: Sistema de login e controle de acesso
2. **Validações**: Validações mais robustas nos formulários
3. **Notificações**: Sistema de alertas e confirmações
4. **Relatórios**: Geração de relatórios em PDF
5. **Calendário**: Visualização de prazos e audiências
6. **Clientes**: Gestão de clientes e contatos
7. **Usuários**: Gestão de usuários e permissões

## 📋 Estrutura de Arquivos

```
src/
├── domain/
│   └── entities/
│       └── Processo.ts           # Entidades de domínio
├── infrastructure/
│   ├── api/                      # Camada de API
│   │   ├── dtos.ts              # Data Transfer Objects
│   │   ├── httpClient.ts        # Cliente HTTP
│   │   ├── processoService.ts   # Serviço de processos
│   │   ├── movimentacaoService.ts
│   │   └── documentoService.ts
│   └── config/
│       └── api.ts               # Configurações da API
├── application/
│   ├── services/
│   │   └── processoService.ts   # Serviços de aplicação
│   └── mappers/
│       └── processoMappers.ts   # Mapeamento DTO ↔ Domain
├── app/
│   ├── processos/
│   │   └── components/          # Componentes Vue
│   │       ├── ProcessosList.vue
│   │       ├── ProcessoDetalhes.vue
│   │       └── ProcessoForm.vue
│   └── stores/
│       └── processoStore.ts     # Estado Pinia
└── router/
    └── index.ts                 # Configuração de rotas
```

## 📝 Convenções

- **Comentários**: Em português para clareza da equipe
- **Nomenclatura**: Português para entidades de domínio, inglês para técnico
- **Types**: TypeScript estrito com interfaces explícitas
- **Error Handling**: Tratamento centralizado de erros
- **Formatting**: Formatação brasileira para datas e valores
