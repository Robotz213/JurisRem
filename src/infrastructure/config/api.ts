/**
 * Configuração base para comunicação com a API JurisREM
 */

/**
 * Configuração da API
 */
export const apiConfig = {
  /** URL base da API - pode ser configurada via variável de ambiente */
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",

  /** Timeout padrão para requisições em milissegundos */
  timeout: 30000,

  /** Headers padrão para todas as requisições */
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * Endpoints da API
 */
export const endpoints = {
  /** Endpoints relacionados a processos */
  processos: {
    /** Listar processos */
    list: "/processos/listagem",
    /** Criar processo */
    create: "/processos/criar_processo",
    /** Obter processo por ID */
    getById: (id: string) => `/processos/${id}`,
    /** Atualizar processo */
    update: (id: string) => `/processos/${id}`,
    /** Deletar processo */
    delete: (id: string) => `/processos/${id}`,
  },

  /** Endpoints relacionados a movimentações */
  movimentacoes: {
    /** Listar movimentações de um processo */
    listByProcesso: (processoId: string) => `/processos/${processoId}/movimentacoes`,
    /** Criar movimentação */
    create: "/movimentacoes",
    /** Obter movimentação por ID */
    getById: (id: string) => `/movimentacoes/${id}`,
    /** Atualizar movimentação */
    update: (id: string) => `/movimentacoes/${id}`,
    /** Deletar movimentação */
    delete: (id: string) => `/movimentacoes/${id}`,
  },

  /** Endpoints relacionados a documentos */
  documentos: {
    /** Listar documentos de um processo */
    listByProcesso: (processoId: string) => `/processos/${processoId}/documentos`,
    /** Upload de documento */
    upload: "/documentos",
    /** Download de documento */
    download: (id: string) => `/documentos/${id}/download`,
    /** Obter documento por ID */
    getById: (id: string) => `/documentos/${id}`,
    /** Deletar documento */
    delete: (id: string) => `/documentos/${id}`,
  },
} as const;
