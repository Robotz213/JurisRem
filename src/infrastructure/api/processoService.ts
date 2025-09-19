import { endpoints } from "../config/api";
import type {
  AtualizarProcessoDTO,
  CriarProcessoDTO,
  FiltrosProcessoDTO,
  ProcessoDTO,
  RespostaPaginada,
} from "./dtos";
import { httpClient } from "./httpClient";

/**
 * Serviço para operações relacionadas a processos na API
 */
export class ProcessoApiService {
  /**
   * Lista processos com filtros opcionais
   * @param filtros - Filtros para busca de processos
   * @returns Lista paginada de processos
   */
  async listarProcessos(filtros?: FiltrosProcessoDTO): Promise<RespostaPaginada> {
    return httpClient.get<RespostaPaginada>(endpoints.processos.list, filtros);
  }

  /**
   * Obtém um processo por ID
   * @param id - ID do processo
   * @returns Dados do processo
   */
  async obterProcesso(id: string): Promise<ProcessoDTO> {
    return httpClient.get<ProcessoDTO>(endpoints.processos.getById(id));
  }

  /**
   * Cria um novo processo
   * @param dadosProcesso - Dados para criação do processo
   * @returns Processo criado
   */
  async criarProcesso(dadosProcesso: CriarProcessoDTO): Promise<ProcessoDTO> {
    return httpClient.post<ProcessoDTO>(endpoints.processos.create, dadosProcesso);
  }

  /**
   * Atualiza um processo existente
   * @param id - ID do processo
   * @param dadosAtualizacao - Dados para atualização
   * @returns Processo atualizado
   */
  async atualizarProcesso(
    id: string,
    dadosAtualizacao: AtualizarProcessoDTO
  ): Promise<ProcessoDTO> {
    return httpClient.put<ProcessoDTO>(endpoints.processos.update(id), dadosAtualizacao);
  }

  /**
   * Remove um processo
   * @param id - ID do processo
   */
  async removerProcesso(id: string): Promise<void> {
    return httpClient.delete<void>(endpoints.processos.delete(id));
  }
}

// Instância singleton do serviço
export const processoApiService = new ProcessoApiService();
