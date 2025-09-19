import { httpClient } from './httpClient';
import { endpoints } from '../config/api';
import type {
  DocumentoDTO,
  UploadDocumentoDTO
} from './dtos';

/**
 * Serviço para operações relacionadas a documentos na API
 */
export class DocumentoApiService {
  /**
   * Lista documentos de um processo específico
   * @param processoId - ID do processo
   * @returns Lista de documentos
   */
  async listarDocumentosPorProcesso(processoId: string): Promise<DocumentoDTO[]> {
    return httpClient.get<DocumentoDTO[]>(endpoints.documentos.listByProcesso(processoId));
  }

  /**
   * Obtém um documento por ID
   * @param id - ID do documento
   * @returns Dados do documento
   */
  async obterDocumento(id: string): Promise<DocumentoDTO> {
    return httpClient.get<DocumentoDTO>(endpoints.documentos.getById(id));
  }

  /**
   * Faz upload de um documento
   * @param dadosUpload - Dados do documento para upload
   * @returns Documento criado
   */
  async uploadDocumento(dadosUpload: UploadDocumentoDTO): Promise<DocumentoDTO> {
    const formData = new FormData();
    formData.append('arquivo', dadosUpload.arquivo);
    formData.append('processoId', dadosUpload.processoId);
    formData.append('tipo', dadosUpload.tipo);
    
    if (dadosUpload.descricao) {
      formData.append('descricao', dadosUpload.descricao);
    }

    return httpClient.uploadFile<DocumentoDTO>(endpoints.documentos.upload, formData);
  }

  /**
   * Faz download de um documento
   * @param id - ID do documento
   * @returns Blob do arquivo
   */
  async downloadDocumento(id: string): Promise<Blob> {
    return httpClient.downloadFile(endpoints.documentos.download(id));
  }

  /**
   * Remove um documento
   * @param id - ID do documento
   */
  async removerDocumento(id: string): Promise<void> {
    return httpClient.delete<void>(endpoints.documentos.delete(id));
  }

  /**
   * Inicia o download de um documento no navegador
   * @param id - ID do documento
   * @param nomeArquivo - Nome do arquivo para download
   */
  async baixarDocumento(id: string, nomeArquivo: string): Promise<void> {
    try {
      const blob = await this.downloadDocumento(id);
      
      // Criar URL temporária para o blob
      const url = window.URL.createObjectURL(blob);
      
      // Criar elemento de link temporário para download
      const link = document.createElement('a');
      link.href = url;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      
      // Disparar o download
      link.click();
      
      // Limpar recursos
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
      throw new Error('Não foi possível baixar o documento');
    }
  }
}

// Instância singleton do serviço
export const documentoApiService = new DocumentoApiService();