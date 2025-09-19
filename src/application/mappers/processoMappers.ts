import type { Processo, Movimentacao, Documento } from '../../domain/entities/Processo';
import { StatusProcesso, TipoProcesso, TipoMovimentacao, TipoDocumento } from '../../domain/entities/Processo';
import type { ProcessoDTO, MovimentacaoDTO, DocumentoDTO, CriarProcessoDTO, AtualizarProcessoDTO } from '../../infrastructure/api/dtos';

/**
 * Mappers para conversão entre entidades de domínio e DTOs da API
 */

/**
 * Converte ProcessoDTO para entidade de domínio
 */
export function processoFromDTO(dto: ProcessoDTO): Processo {
  return {
    id: dto.id,
    numeroProcesso: dto.numeroProcesso,
    titulo: dto.titulo,
    descricao: dto.descricao,
    status: dto.status as StatusProcesso,
    tipo: dto.tipo as TipoProcesso,
    dataCriacao: new Date(dto.dataCriacao),
    dataAtualizacao: new Date(dto.dataAtualizacao),
    cliente: dto.cliente,
    parteContraria: dto.parteContraria,
    valorCausa: dto.valorCausa,
    tribunal: dto.tribunal,
    movimentacoes: dto.movimentacoes?.map(movimentacaoFromDTO),
    documentos: dto.documentos?.map(documentoFromDTO)
  };
}

/**
 * Converte entidade Processo para CriarProcessoDTO
 */
export function processoToCreateDTO(processo: Omit<Processo, 'id' | 'dataCriacao' | 'dataAtualizacao' | 'movimentacoes' | 'documentos'>): CriarProcessoDTO {
  return {
    numeroProcesso: processo.numeroProcesso,
    titulo: processo.titulo,
    descricao: processo.descricao,
    tipo: processo.tipo,
    cliente: processo.cliente,
    parteContraria: processo.parteContraria,
    valorCausa: processo.valorCausa,
    tribunal: processo.tribunal
  };
}

/**
 * Converte dados de atualização para AtualizarProcessoDTO
 */
export function processoToUpdateDTO(dadosAtualizacao: Partial<Processo>): AtualizarProcessoDTO {
  return {
    titulo: dadosAtualizacao.titulo,
    descricao: dadosAtualizacao.descricao,
    status: dadosAtualizacao.status,
    parteContraria: dadosAtualizacao.parteContraria,
    valorCausa: dadosAtualizacao.valorCausa,
    tribunal: dadosAtualizacao.tribunal
  };
}

/**
 * Converte MovimentacaoDTO para entidade de domínio
 */
export function movimentacaoFromDTO(dto: MovimentacaoDTO): Movimentacao {
  return {
    id: dto.id,
    processoId: dto.processoId,
    tipo: dto.tipo as TipoMovimentacao,
    descricao: dto.descricao,
    data: new Date(dto.data),
    usuario: dto.usuario,
    observacoes: dto.observacoes
  };
}

/**
 * Converte DocumentoDTO para entidade de domínio
 */
export function documentoFromDTO(dto: DocumentoDTO): Documento {
  return {
    id: dto.id,
    processoId: dto.processoId,
    nomeArquivo: dto.nomeArquivo,
    tipo: dto.tipo as TipoDocumento,
    tamanho: dto.tamanho,
    mimeType: dto.mimeType,
    url: dto.url,
    dataUpload: new Date(dto.dataUpload),
    descricao: dto.descricao
  };
}

/**
 * Utilitários para formatação
 */
export const formatters = {
  /**
   * Formata valor monetário em centavos para real
   */
  formatarValorCausa(valorCentavos?: number): string {
    if (!valorCentavos) return 'Não informado';
    const valorReais = valorCentavos / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valorReais);
  },

  /**
   * Formata data para exibição
   */
  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  },

  /**
   * Formata tamanho de arquivo
   */
  formatarTamanhoArquivo(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },

  /**
   * Converte status para cor do badge
   */
  statusParaCor(status: StatusProcesso): string {
    const cores = {
      [StatusProcesso.RASCUNHO]: 'secondary',
      [StatusProcesso.ATIVO]: 'primary',
      [StatusProcesso.AGUARDANDO]: 'warning',
      [StatusProcesso.SUSPENSO]: 'info',
      [StatusProcesso.ARQUIVADO]: 'dark',
      [StatusProcesso.FINALIZADO]: 'success'
    };
    return cores[status] || 'secondary';
  },

  /**
   * Converte tipo de processo para label legível
   */
  tipoProcessoLabel(tipo: TipoProcesso): string {
    const labels = {
      [TipoProcesso.CIVIL]: 'Civil',
      [TipoProcesso.CRIMINAL]: 'Criminal',
      [TipoProcesso.TRABALHISTA]: 'Trabalhista',
      [TipoProcesso.TRIBUTARIO]: 'Tributário',
      [TipoProcesso.ADMINISTRATIVO]: 'Administrativo',
      [TipoProcesso.FAMILIA]: 'Família',
      [TipoProcesso.EMPRESARIAL]: 'Empresarial'
    };
    return labels[tipo] || tipo;
  }
};