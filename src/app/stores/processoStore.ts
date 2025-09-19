import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { processoService } from "../../application/services/processoService";
import type { Processo, StatusProcesso, TipoProcesso } from "../../domain/entities/Processo";
import type { FiltrosProcessoDTO } from "../../infrastructure/api/dtos";

/**
 * Store Pinia para gerenciamento de estado dos processos
 */
export const useProcessoStore = defineStore("processo", () => {
  // Estado
  const processos = ref<Processo[]>([]);
  const processoAtual = ref<Processo | null>(null);
  const carregandoLista = ref(false);
  const carregandoDetalhes = ref(false);
  const salvando = ref(false);
  const erro = ref<string | null>(null);

  // Paginação
  const paginaAtual = ref(1);
  const itensPorPagina = ref(10);
  const totalItens = ref(0);
  const totalPaginas = ref(0);

  // Filtros
  const filtros = ref<FiltrosProcessoDTO>({});

  // Getters
  const processosOrdenados = computed(() => {
    return [...processos.value].sort(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    );
  });

  const temProcessos = computed(() => processos.value.length > 0);

  const temMaisItens = computed(() => paginaAtual.value < totalPaginas.value);

  // Actions
  async function carregarProcessos(novosFiltros?: FiltrosProcessoDTO) {
    try {
      carregandoLista.value = true;
      erro.value = null;

      // Atualizar filtros se fornecidos
      if (novosFiltros) {
        filtros.value = { ...novosFiltros };
        paginaAtual.value = 1; // Reset página ao aplicar filtros
      }

      const parametros = {
        ...filtros.value,
        pagina: paginaAtual.value,
        itensPorPagina: itensPorPagina.value,
      };

      const resposta = await processoService.listarProcessos(parametros);

      processos.value = resposta.data;
      totalItens.value = resposta.total;
      totalPaginas.value = resposta.totalPaginas;
      paginaAtual.value = resposta.pagina;
      itensPorPagina.value = resposta.itensPorPagina;
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao carregar processos";
      console.error("Erro ao carregar processos:", error);
    } finally {
      carregandoLista.value = false;
    }
  }

  async function carregarMaisProcessos() {
    if (!temMaisItens.value || carregandoLista.value) return;

    try {
      carregandoLista.value = true;
      erro.value = null;

      const parametros = {
        ...filtros.value,
        pagina: paginaAtual.value + 1,
        itensPorPagina: itensPorPagina.value,
      };

      const resposta = await processoService.listarProcessos(parametros);

      // Adicionar novos processos à lista existente
      processos.value.push(...resposta.data);
      paginaAtual.value = resposta.pagina;
      totalPaginas.value = resposta.totalPaginas;
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao carregar mais processos";
      console.error("Erro ao carregar mais processos:", error);
    } finally {
      carregandoLista.value = false;
    }
  }

  async function carregarProcessoDetalhes(id: string) {
    try {
      carregandoDetalhes.value = true;
      erro.value = null;

      const processo = await processoService.obterProcessoCompleto(id);
      processoAtual.value = processo;

      // Atualizar processo na lista se já estiver carregado
      const index = processos.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        processos.value[index] = processo;
      }
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao carregar detalhes do processo";
      console.error("Erro ao carregar processo:", error);
    } finally {
      carregandoDetalhes.value = false;
    }
  }

  async function criarProcesso(
    dadosProcesso: Omit<
      Processo,
      "id" | "dataCriacao" | "dataAtualizacao" | "movimentacoes" | "documentos"
    >
  ) {
    try {
      salvando.value = true;
      erro.value = null;

      const novoProcesso = await processoService.criarProcesso(dadosProcesso);

      // Adicionar à lista
      processos.value.unshift(novoProcesso);
      totalItens.value++;

      return novoProcesso;
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao criar processo";
      console.error("Erro ao criar processo:", error);
      throw error;
    } finally {
      salvando.value = false;
    }
  }

  async function atualizarProcesso(id: string, dadosAtualizacao: Partial<Processo>) {
    try {
      salvando.value = true;
      erro.value = null;

      const processoAtualizado = await processoService.atualizarProcesso(id, dadosAtualizacao);

      // Atualizar na lista
      const index = processos.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        processos.value[index] = processoAtualizado;
      }

      // Atualizar processo atual se for o mesmo
      if (processoAtual.value?.id === id) {
        processoAtual.value = processoAtualizado;
      }

      return processoAtualizado;
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao atualizar processo";
      console.error("Erro ao atualizar processo:", error);
      throw error;
    } finally {
      salvando.value = false;
    }
  }

  async function removerProcesso(id: string) {
    try {
      salvando.value = true;
      erro.value = null;

      await processoService.removerProcesso(id);

      // Remover da lista
      const index = processos.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        processos.value.splice(index, 1);
        totalItens.value--;
      }

      // Limpar processo atual se for o mesmo
      if (processoAtual.value?.id === id) {
        processoAtual.value = null;
      }
    } catch (error) {
      erro.value = error instanceof Error ? error.message : "Erro ao remover processo";
      console.error("Erro ao remover processo:", error);
      throw error;
    } finally {
      salvando.value = false;
    }
  }

  function limparErro() {
    erro.value = null;
  }

  function limparProcessoAtual() {
    processoAtual.value = null;
  }

  function aplicarFiltros(novosFiltros: FiltrosProcessoDTO) {
    filtros.value = { ...novosFiltros };
    paginaAtual.value = 1;
    carregarProcessos();
  }

  function limparFiltros() {
    filtros.value = {};
    paginaAtual.value = 1;
    carregarProcessos();
  }

  // Busca um processo na lista por ID
  function buscarProcessoPorId(id: string): Processo | undefined {
    return processos.value.find((p) => p.id === id);
  }

  // Filtra processos por status
  function filtrarPorStatus(status: StatusProcesso[]): Processo[] {
    if (status.length === 0) return processos.value;
    return processos.value.filter((p) => status.includes(p.status));
  }

  // Filtra processos por tipo
  function filtrarPorTipo(tipos: TipoProcesso[]): Processo[] {
    if (tipos.length === 0) return processos.value;
    return processos.value.filter((p) => tipos.includes(p.areaJuridica));
  }

  return {
    // Estado
    processos: processosOrdenados,
    processoAtual,
    carregandoLista,
    carregandoDetalhes,
    salvando,
    erro,
    paginaAtual,
    itensPorPagina,
    totalItens,
    totalPaginas,
    filtros,

    // Getters
    temProcessos,
    temMaisItens,

    // Actions
    carregarProcessos,
    carregarMaisProcessos,
    carregarProcessoDetalhes,
    criarProcesso,
    atualizarProcesso,
    removerProcesso,
    limparErro,
    limparProcessoAtual,
    aplicarFiltros,
    limparFiltros,
    buscarProcessoPorId,
    filtrarPorStatus,
    filtrarPorTipo,
  };
});
