/**
 * DTOs (Data Transfer Objects) para comunicação com a API JurisREM
 * Representam os dados como são enviados/recebidos da API
 */

/**
 * DTO para processo retornado pela API
 */
export interface ProcessoDTO {
  id: string;
  numeroProcesso: string;
  titulo: string;
  descricao: string;
  status: string;
  tipo: string;
  dataCriacao: string; // ISO date string
  dataAtualizacao: string; // ISO date string
  cliente: string;
  parteContraria?: string;
  valorCausa?: number;
  tribunal?: string;
  movimentacoes?: MovimentacaoDTO[];
  documentos?: DocumentoDTO[];
}

/**
 * DTO para criação de processo
 */
export interface CriarProcessoDTO {
  numeroProcesso: string;
  titulo: string;
  descricao: string;
  tipo: string;
  cliente: string;
  parteContraria?: string;
  valorCausa?: number;
  tribunal?: string;
}

/**
 * DTO para atualização de processo
 */
export interface AtualizarProcessoDTO {
  titulo?: string;
  descricao?: string;
  status?: string;
  parteContraria?: string;
  valorCausa?: number;
  tribunal?: string;
}

/**
 * DTO para movimentação retornada pela API
 */
export interface MovimentacaoDTO {
  id: string;
  processoId: string;
  tipo: string;
  descricao: string;
  data: string; // ISO date string
  usuario?: string;
  observacoes?: string;
}

/**
 * DTO para criação de movimentação
 */
export interface CriarMovimentacaoDTO {
  processoId: string;
  tipo: string;
  descricao: string;
  observacoes?: string;
}

/**
 * DTO para documento retornado pela API
 */
export interface DocumentoDTO {
  id: string;
  processoId: string;
  nomeArquivo: string;
  tipo: string;
  tamanho: number;
  mimeType: string;
  url: string;
  dataUpload: string; // ISO date string
  descricao?: string;
}

/**
 * DTO para upload de documento
 */
export interface UploadDocumentoDTO {
  processoId: string;
  tipo: string;
  descricao?: string;
  arquivo: File;
}

/**
 * DTO para resposta paginada da API
 */
export interface RespostaPaginada<T> {
  data: T[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

/**
 * DTO para filtros de busca de processos
 */
export interface FiltrosProcessoDTO {
  titulo?: string;
  numeroProcesso?: string;
  cliente?: string;
  status?: string[];
  tipo?: string[];
  dataInicio?: string;
  dataFim?: string;
  pagina?: number;
  itensPorPagina?: number;
}

/**
 * DTO para resposta de erro da API
 */
export interface ErrorDTO {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}