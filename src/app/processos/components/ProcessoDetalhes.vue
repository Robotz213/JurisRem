<template>
  <div class="processo-detalhes">
    <!-- Estado de carregamento -->
    <div v-if="carregandoDetalhes" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-2 text-muted">Carregando detalhes do processo...</p>
    </div>

    <!-- Processo não encontrado -->
    <div v-else-if="!processoAtual" class="alert alert-warning">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Processo não encontrado.
      <router-link :to="{ name: 'processos-lista' }" class="btn btn-sm btn-outline-warning ms-2">
        Voltar à Lista
      </router-link>
    </div>

    <!-- Detalhes do processo -->
    <div v-else>
      <!-- Cabeçalho -->
      <div class="card mb-4">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="d-flex align-items-center mb-2">
                <router-link
                  :to="{ name: 'processos-lista' }"
                  class="btn btn-sm btn-outline-secondary me-3"
                >
                  <i class="fas fa-arrow-left me-1"></i>
                  Voltar
                </router-link>
                <h4 class="mb-0">{{ processoAtual.titulo }}</h4>
                <span
                  class="badge ms-3"
                  :class="`bg-${formatters.statusParaCor(processoAtual.status)}`"
                >
                  {{ processoAtual.status }}
                </span>
              </div>
              <p class="text-muted mb-0">
                <strong>Número:</strong> {{ processoAtual.numeroProcesso }}
              </p>
            </div>
            <div class="dropdown">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-cog me-1"></i>
                Ações
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" @click="abrirModalMovimentacao">
                    <i class="fas fa-plus me-2"></i>
                    Adicionar Movimentação
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" @click="abrirModalDocumento">
                    <i class="fas fa-upload me-2"></i>
                    Upload Documento
                  </button>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link
                    :to="{ name: 'processo-editar', params: { id: processoAtual.id } }"
                    class="dropdown-item"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Editar Processo
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Informações principais -->
        <div class="col-lg-8">
          <!-- Dados básicos -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="fas fa-info-circle me-2"></i>
                Informações Básicas
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Cliente</label>
                  <p class="mb-0">{{ processoAtual.cliente }}</p>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Tipo</label>
                  <p class="mb-0">{{ formatters.tipoProcessoLabel(processoAtual.areaJuridica) }}</p>
                </div>
                <div v-if="processoAtual.parteContraria" class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Parte Contrária</label>
                  <p class="mb-0">{{ processoAtual.parteContraria }}</p>
                </div>
                <div v-if="processoAtual.tribunal" class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Tribunal</label>
                  <p class="mb-0">{{ processoAtual.tribunal }}</p>
                </div>
                <div v-if="processoAtual.valorCausa" class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Valor da Causa</label>
                  <p class="mb-0">{{ formatters.formatarValorCausa(processoAtual.valorCausa) }}</p>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Data de Criação</label>
                  <p class="mb-0">{{ formatters.formatarData(processoAtual.dataCriacao) }}</p>
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Descrição</label>
                  <p class="mb-0">{{ processoAtual.descricao }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Movimentações -->
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <i class="fas fa-history me-2"></i>
                Movimentações
                <span v-if="processoAtual.movimentacoes" class="badge bg-secondary ms-2">
                  {{ processoAtual.movimentacoes.length }}
                </span>
              </h5>
              <button class="btn btn-sm btn-outline-primary" @click="abrirModalMovimentacao">
                <i class="fas fa-plus me-1"></i>
                Adicionar
              </button>
            </div>
            <div class="card-body">
              <div v-if="!processoAtual.movimentacoes?.length" class="text-center py-4 text-muted">
                <i class="fas fa-clock fa-2x mb-2"></i>
                <p class="mb-0">Nenhuma movimentação registrada</p>
              </div>
              <div v-else class="timeline">
                <div
                  v-for="movimentacao in movimentacoesOrdenadas"
                  :key="movimentacao.id"
                  class="timeline-item"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <h6 class="mb-1">{{ movimentacao.areaJuridica }}</h6>
                      <small class="text-muted">{{
                        formatters.formatarData(movimentacao.data)
                      }}</small>
                    </div>
                    <p class="mb-1">{{ movimentacao.descricao }}</p>
                    <div v-if="movimentacao.observacoes" class="mt-2">
                      <small class="text-muted">
                        <strong>Observações:</strong> {{ movimentacao.observacoes }}
                      </small>
                    </div>
                    <div v-if="movimentacao.usuario" class="mt-1">
                      <small class="text-muted">
                        <i class="fas fa-user me-1"></i>
                        {{ movimentacao.usuario }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Documentos -->
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <i class="fas fa-file me-2"></i>
                Documentos
                <span v-if="processoAtual.documentos" class="badge bg-secondary ms-2">
                  {{ processoAtual.documentos.length }}
                </span>
              </h5>
              <button class="btn btn-sm btn-outline-primary" @click="abrirModalDocumento">
                <i class="fas fa-upload me-1"></i>
                Upload
              </button>
            </div>
            <div class="card-body">
              <div v-if="!processoAtual.documentos?.length" class="text-center py-3 text-muted">
                <i class="fas fa-folder-open fa-2x mb-2"></i>
                <p class="mb-0 small">Nenhum documento anexado</p>
              </div>
              <div v-else class="list-group list-group-flush">
                <div
                  v-for="documento in processoAtual.documentos"
                  :key="documento.id"
                  class="list-group-item px-0 py-2"
                >
                  <div class="d-flex align-items-center">
                    <i class="fas fa-file-alt text-muted me-2"></i>
                    <div class="flex-grow-1 min-width-0">
                      <h6 class="mb-1 text-truncate">{{ documento.nomeArquivo }}</h6>
                      <small class="text-muted">
                        {{ formatters.formatarTamanhoArquivo(documento.tamanho) }}
                        • {{ formatters.formatarData(documento.dataUpload) }}
                      </small>
                      <div v-if="documento.descricao" class="mt-1">
                        <small class="text-muted">{{ documento.descricao }}</small>
                      </div>
                    </div>
                    <button
                      @click="baixarDocumento(documento)"
                      class="btn btn-sm btn-outline-secondary ms-2"
                      :title="`Baixar ${documento.nomeArquivo}`"
                    >
                      <i class="fas fa-download"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estatísticas rápidas -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="fas fa-chart-bar me-2"></i>
                Resumo
              </h5>
            </div>
            <div class="card-body">
              <div class="row text-center">
                <div class="col-6">
                  <div class="border-end">
                    <h4 class="text-primary mb-1">
                      {{ processoAtual.movimentacoes?.length || 0 }}
                    </h4>
                    <small class="text-muted">Movimentações</small>
                  </div>
                </div>
                <div class="col-6">
                  <h4 class="text-info mb-1">{{ processoAtual.documentos?.length || 0 }}</h4>
                  <small class="text-muted">Documentos</small>
                </div>
              </div>
              <hr />
              <div class="row text-center">
                <div class="col-12">
                  <small class="text-muted">Última atualização</small>
                  <p class="mb-0 small">
                    {{ formatters.formatarData(processoAtual.dataAtualizacao) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="erro" class="alert alert-danger mt-3">
      <i class="fas fa-exclamation-triangle me-2"></i>
      {{ erro }}
      <button @click="limparErro" type="button" class="btn-close float-end"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { formatters } from "../../../application/mappers/processoMappers";
import { processoService } from "../../../application/services/processoService";
import type { Documento } from "../../../domain/entities/Processo";
import { useProcessoStore } from "../../stores/processoStore";

const route = useRoute();
const processoStore = useProcessoStore();

// Estado reativo do store
const { processoAtual, carregandoDetalhes, erro } = storeToRefs(processoStore);

// Actions do store
const { carregarProcessoDetalhes, limparErro, limparProcessoAtual } = processoStore;

// Computed
const movimentacoesOrdenadas = computed(() => {
  if (!processoAtual.value?.movimentacoes) return [];
  return [...processoAtual.value.movimentacoes].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
});

// Métodos
function abrirModalMovimentacao() {
  // TODO: Implementar modal de movimentação
  console.log("Abrir modal de movimentação");
}

function abrirModalDocumento() {
  // TODO: Implementar modal de documento
  console.log("Abrir modal de documento");
}

async function baixarDocumento(documento: Documento) {
  try {
    await processoService.baixarDocumento(documento);
  } catch (error) {
    console.error("Erro ao baixar documento:", error);
    // TODO: Mostrar notificação de erro
  }
}

// Watchers
watch(
  () => route.params.id,
  (novoId) => {
    if (novoId && typeof novoId === "string") {
      carregarProcessoDetalhes(novoId);
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  const id = route.params.id as string;
  if (id) {
    carregarProcessoDetalhes(id);
  }
});

// Cleanup
onMounted(() => {
  return () => {
    limparProcessoAtual();
  };
});
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #dee2e6;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -2.25rem;
  top: 0.25rem;
  width: 12px;
  height: 12px;
  border: 2px solid #007bff;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.timeline-content {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
}

.min-width-0 {
  min-width: 0;
}

.border-end {
  border-right: 1px solid #dee2e6 !important;
}
</style>
