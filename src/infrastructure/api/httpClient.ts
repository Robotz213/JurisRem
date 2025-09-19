import axios, { AxiosInstance, AxiosError } from 'axios';
import { apiConfig } from '../config/api';
import type { ErrorDTO } from './dtos';

/**
 * Cliente HTTP base para comunicação com a API JurisREM
 * Centraliza a configuração do axios e tratamento de erros
 */
export class HttpClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: apiConfig.headers
    });

    this.setupInterceptors();
  }

  /**
   * Configura interceptadores para requisições e respostas
   */
  private setupInterceptors(): void {
    // Interceptador de requisições
    this.instance.interceptors.request.use(
      (config) => {
        // Adicionar token de autenticação quando disponível
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API] Erro na requisição:', error);
        return Promise.reject(error);
      }
    );

    // Interceptador de respostas
    this.instance.interceptors.response.use(
      (response) => {
        console.log(`[API] ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  /**
   * Obtém o token de autenticação do localStorage ou store
   * @returns Token de autenticação ou null
   */
  private getAuthToken(): string | null {
    // TODO: Implementar busca do token de auth
    return localStorage.getItem('authToken');
  }

  /**
   * Trata erros de resposta da API
   * @param error - Erro do axios
   * @returns Promise rejeitada com erro formatado
   */
  private handleError(error: AxiosError): Promise<never> {
    console.error('[API] Erro na resposta:', error);

    if (error.response) {
      // Servidor respondeu com status de erro
      const errorData = error.response.data as ErrorDTO;
      const customError = new Error(
        errorData.message || `Erro ${error.response.status}: ${error.response.statusText}`
      );
      (customError as any).statusCode = error.response.status;
      (customError as any).details = errorData.details;
      return Promise.reject(customError);
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      return Promise.reject(new Error('Erro de conexão: Servidor não está respondendo'));
    } else {
      // Erro na configuração da requisição
      return Promise.reject(new Error(`Erro na requisição: ${error.message}`));
    }
  }

  /**
   * Realiza requisição GET
   */
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.instance.get(url, { params });
    return response.data;
  }

  /**
   * Realiza requisição POST
   */
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.instance.post(url, data);
    return response.data;
  }

  /**
   * Realiza requisição PUT
   */
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.instance.put(url, data);
    return response.data;
  }

  /**
   * Realiza requisição PATCH
   */
  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.instance.patch(url, data);
    return response.data;
  }

  /**
   * Realiza requisição DELETE
   */
  async delete<T>(url: string): Promise<T> {
    const response = await this.instance.delete(url);
    return response.data;
  }

  /**
   * Upload de arquivo com FormData
   */
  async uploadFile<T>(url: string, formData: FormData): Promise<T> {
    const response = await this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  /**
   * Download de arquivo
   */
  async downloadFile(url: string): Promise<Blob> {
    const response = await this.instance.get(url, {
      responseType: 'blob'
    });
    return response.data;
  }
}

// Instância singleton do cliente HTTP
export const httpClient = new HttpClient();