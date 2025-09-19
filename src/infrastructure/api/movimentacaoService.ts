import { httpClient } from './httpClient';
import { endpoints } from '../config/api';
import type {
  MovimentacaoDTO,
  CriarMovimentacaoDTO
} from './dtos';

/**
 * Serviço para operações relacionadas a movimentações na API
 */
export class MovimentacaoApiService {
  /**
   * Lista movimentações de um processo específico
   * @param processoId - ID do processo
   * @returns Lista de movimentações
   */
  async listarMovimentacoesPorProcesso(processoId: string): Promise<MovimentacaoDTO[]> {
    return httpClient.get<MovimentacaoDTO[]>(endpoints.movimentacoes.listByProcesso(processoId));
  }

  /**
   * Obtém uma movimentação por ID
   * @param id - ID da movimentação
   * @returns Dados da movimentação
   */
  async obterMovimentacao(id: string): Promise<MovimentacaoDTO> {
    return httpClient.get<MovimentacaoDTO>(endpoints.movimentacoes.getById(id));
  }

  /**
   * Cria uma nova movimentação
   * @param dadosMovimentacao - Dados para criação da movimentação
   * @returns Movimentação criada
   */
  async criarMovimentacao(dadosMovimentacao: CriarMovimentacaoDTO): Promise<MovimentacaoDTO> {
    return httpClient.post<MovimentacaoDTO>(endpoints.movimentacoes.create, dadosMovimentacao);
  }

  /**
   * Remove uma movimentação
   * @param id - ID da movimentação
   */
  async removerMovimentacao(id: string): Promise<void> {
    return httpClient.delete<void>(endpoints.movimentacoes.delete(id));
  }
}

// Instância singleton do serviço
export const movimentacaoApiService = new MovimentacaoApiService();