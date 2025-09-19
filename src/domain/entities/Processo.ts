/**
 * Entidade do domínio para representar um processo judicial
 */
export interface Processo {
  /** Identificador único do processo */
  id: string;

  /** Número do processo no sistema judicial */
  numeroProcesso: string;

  /** Título ou assunto do processo */
  titulo: string;

  /** Descrição detalhada do processo */
  descricao: string;

  /** Status atual do processo */
  status: StatusProcesso;

  /** Tipo de processo */
  areaJuridica: TipoProcesso;

  /** Data de criação do processo */
  dataCriacao: Date;

  /** Data da última atualização */
  dataAtualizacao: Date;

  /** Nome do cliente/requerente */
  cliente: string;

  /** Parte contrária no processo */
  parteContraria?: string;

  /** Valor da causa em centavos */
  valorCausa?: number;

  /** Tribunal/vara responsável */
  tribunal?: string;

  /** Lista de movimentações do processo */
  movimentacoes?: Movimentacao[];

  /** Lista de documentos anexados */
  documentos?: Documento[];
}

/**
 * Entidade para representar uma movimentação/atualização do processo
 */
export interface Movimentacao {
  /** Identificador único da movimentação */
  id: string;

  /** ID do processo ao qual pertence */
  processoId: string;

  /** Tipo de movimentação */
  areaJuridica: TipoMovimentacao;

  /** Descrição da movimentação */
  descricao: string;

  /** Data da movimentação */
  data: Date;

  /** Usuário responsável pela movimentação */
  usuario?: string;

  /** Observações adicionais */
  observacoes?: string;
}

/**
 * Entidade para representar um documento anexado ao processo
 */
export interface Documento {
  /** Identificador único do documento */
  id: string;

  /** ID do processo ao qual pertence */
  processoId: string;

  /** Nome do arquivo */
  nomeArquivo: string;

  /** Tipo/categoria do documento */
  areaJuridica: TipoDocumento;

  /** Tamanho do arquivo em bytes */
  tamanho: number;

  /** Tipo MIME do arquivo */
  mimeType: string;

  /** URL ou caminho para download */
  url: string;

  /** Data de upload */
  dataUpload: Date;

  /** Descrição do documento */
  descricao?: string;
}

/**
 * Enum para status do processo
 */
export enum StatusProcesso {
  RASCUNHO = "rascunho",
  ATIVO = "ativo",
  AGUARDANDO = "aguardando",
  SUSPENSO = "suspenso",
  ARQUIVADO = "arquivado",
  FINALIZADO = "finalizado",
}

/**
 * Enum para tipos de processo
 */
export enum TipoProcesso {
  CIVIL = "civil",
  CRIMINAL = "criminal",
  TRABALHISTA = "trabalhista",
  TRIBUTARIO = "tributario",
  ADMINISTRATIVO = "administrativo",
  FAMILIA = "familia",
  EMPRESARIAL = "empresarial",
}

/**
 * Enum para tipos de movimentação
 */
export enum TipoMovimentacao {
  PETICAO = "peticao",
  AUDIENCIA = "audiencia",
  DECISAO = "decisao",
  RECURSO = "recurso",
  DESPACHO = "despacho",
  SENTENCA = "sentenca",
  CITACAO = "citacao",
  INTIMACAO = "intimacao",
  OUTROS = "outros",
}

/**
 * Enum para tipos de documento
 */
export enum TipoDocumento {
  PETICAO_INICIAL = "peticao_inicial",
  CONTESTACAO = "contestacao",
  PROVA = "prova",
  PROCURACAO = "procuracao",
  CONTRATO = "contrato",
  CERTIDAO = "certidao",
  LAUDO = "laudo",
  ATA = "ata",
  OUTROS = "outros",
}
