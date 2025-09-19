import { processoApiService } from '../../infrastructure/api/processoService';
import { movimentacaoApiService } from '../../infrastructure/api/movimentacaoService';
import { documentoApiService } from '../../infrastructure/api/documentoService';
import { processoFromDTO, processoToCreateDTO, processoToUpdateDTO, movimentacaoFromDTO, documentoFromDTO } from '../mappers/processoMappers';
import type { Processo, Movimentacao, Documento } from '../../domain/entities/Processo';
import type { FiltrosProcessoDTO, CriarMovimentacaoDTO, UploadDocumentoDTO, RespostaPaginada } from '../../infrastructure/api/dtos';

/**
 * Serviço de aplicação para gerenciamento de processos
 * Centraliza as regras de negócio e coordena operações entre diferentes serviços
 */
export class ProcessoService {
  /**
   * Lista processos com filtros opcionais
   * @param filtros - Filtros para busca
   * @returns Lista paginada de processos
   */
  async listarProcessos(filtros?: FiltrosProcessoDTO): Promise<RespostaPaginada<Processo>> {
    try {
      const resposta = await processoApiService.listarProcessos(filtros);
      
      return {
        ...resposta,
        data: resposta.data.map(processoFromDTO)
      };
    } catch (error) {
      console.error('Erro ao listar processos:', error);
      throw new Error('Não foi possível carregar a lista de processos');
    }
  }

  /**
   * Obtém um processo específico com suas movimentações e documentos
   * @param id - ID do processo
   * @returns Processo completo
   */
  async obterProcessoCompleto(id: string): Promise<Processo> {
    try {
      // Buscar processo base
      const processoDto = await processoApiService.obterProcesso(id);
      const processo = processoFromDTO(processoDto);

      // Buscar movimentações e documentos em paralelo
      const [movimentacoes, documentos] = await Promise.all([
        this.obterMovimentacoesProcesso(id),
        this.obterDocumentosProcesso(id)
      ]);

      return {
        ...processo,
        movimentacoes,
        documentos
      };
    } catch (error) {
      console.error('Erro ao obter processo:', error);
      throw new Error('Não foi possível carregar os detalhes do processo');
    }
  }

  /**
   * Cria um novo processo
   * @param dadosProcesso - Dados do processo
   * @returns Processo criado
   */
  async criarProcesso(dadosProcesso: Omit<Processo, 'id' | 'dataCriacao' | 'dataAtualizacao' | 'movimentacoes' | 'documentos'>): Promise<Processo> {
    try {
      // Validar dados obrigatórios
      this.validarDadosProcesso(dadosProcesso);

      const dto = processoToCreateDTO(dadosProcesso);
      const processoDto = await processoApiService.criarProcesso(dto);
      
      return processoFromDTO(processoDto);
    } catch (error) {
      console.error('Erro ao criar processo:', error);
      throw new Error('Não foi possível criar o processo');
    }
  }

  /**
   * Atualiza um processo existente
   * @param id - ID do processo
   * @param dadosAtualizacao - Dados para atualização
   * @returns Processo atualizado
   */
  async atualizarProcesso(id: string, dadosAtualizacao: Partial<Processo>): Promise<Processo> {
    try {
      const dto = processoToUpdateDTO(dadosAtualizacao);
      const processoDto = await processoApiService.atualizarProcesso(id, dto);
      
      return processoFromDTO(processoDto);
    } catch (error) {
      console.error('Erro ao atualizar processo:', error);
      throw new Error('Não foi possível atualizar o processo');
    }
  }

  /**
   * Remove um processo
   * @param id - ID do processo
   */
  async removerProcesso(id: string): Promise<void> {
    try {
      await processoApiService.removerProcesso(id);
    } catch (error) {
      console.error('Erro ao remover processo:', error);
      throw new Error('Não foi possível remover o processo');
    }
  }

  /**
   * Obtém movimentações de um processo
   * @param processoId - ID do processo
   * @returns Lista de movimentações
   */
  async obterMovimentacoesProcesso(processoId: string): Promise<Movimentacao[]> {
    try {
      const movimentacoesDto = await movimentacaoApiService.listarMovimentacoesPorProcesso(processoId);
      return movimentacoesDto.map(movimentacaoFromDTO);
    } catch (error) {
      console.error('Erro ao obter movimentações:', error);
      return []; // Retorna lista vazia em caso de erro
    }
  }

  /**
   * Adiciona uma movimentação ao processo
   * @param dadosMovimentacao - Dados da movimentação
   * @returns Movimentação criada
   */
  async adicionarMovimentacao(dadosMovimentacao: CriarMovimentacaoDTO): Promise<Movimentacao> {
    try {
      const movimentacaoDto = await movimentacaoApiService.criarMovimentacao(dadosMovimentacao);
      return movimentacaoFromDTO(movimentacaoDto);
    } catch (error) {
      console.error('Erro ao adicionar movimentação:', error);
      throw new Error('Não foi possível adicionar a movimentação');
    }
  }

  /**
   * Obtém documentos de um processo
   * @param processoId - ID do processo
   * @returns Lista de documentos
   */
  async obterDocumentosProcesso(processoId: string): Promise<Documento[]> {
    try {
      const documentosDto = await documentoApiService.listarDocumentosPorProcesso(processoId);
      return documentosDto.map(documentoFromDTO);
    } catch (error) {
      console.error('Erro ao obter documentos:', error);
      return []; // Retorna lista vazia em caso de erro
    }
  }

  /**
   * Faz upload de um documento
   * @param dadosUpload - Dados do upload
   * @returns Documento criado
   */
  async uploadDocumento(dadosUpload: UploadDocumentoDTO): Promise<Documento> {
    try {
      // Validar arquivo
      this.validarArquivo(dadosUpload.arquivo);

      const documentoDto = await documentoApiService.uploadDocumento(dadosUpload);
      return documentoFromDTO(documentoDto);
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error);
      throw new Error('Não foi possível fazer upload do documento');
    }
  }

  /**
   * Baixa um documento
   * @param documento - Documento a ser baixado
   */
  async baixarDocumento(documento: Documento): Promise<void> {
    try {
      await documentoApiService.baixarDocumento(documento.id, documento.nomeArquivo);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      throw new Error('Não foi possível baixar o documento');
    }
  }

  /**
   * Valida dados obrigatórios do processo
   * @private
   */
  private validarDadosProcesso(dados: any): void {
    if (!dados.numeroProcesso?.trim()) {
      throw new Error('Número do processo é obrigatório');
    }
    if (!dados.titulo?.trim()) {
      throw new Error('Título do processo é obrigatório');
    }
    if (!dados.cliente?.trim()) {
      throw new Error('Cliente é obrigatório');
    }
    if (!dados.tipo) {
      throw new Error('Tipo do processo é obrigatório');
    }
  }

  /**
   * Valida arquivo para upload
   * @private
   */
  private validarArquivo(arquivo: File): void {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'text/plain'
    ];

    if (arquivo.size > MAX_SIZE) {
      throw new Error('Arquivo muito grande. Tamanho máximo: 10MB');
    }

    if (!ALLOWED_TYPES.includes(arquivo.type)) {
      throw new Error('Tipo de arquivo não permitido. Tipos aceitos: PDF, Word, imagens e texto');
    }
  }
}

// Instância singleton do serviço
export const processoService = new ProcessoService();