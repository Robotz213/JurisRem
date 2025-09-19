<template>
  <div class="processos-list">
    <!-- Cabeçalho com filtros e ações -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0">
          <i class="fas fa-gavel me-2"></i>
          Processos Jurídicos
        </h4>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="toggleFiltros">
            <i class="fas fa-filter me-1"></i>
            Filtros
          </button>
          <router-link :to="{ name: 'processo-criar' }" class="btn btn-primary">
            <i class="fas fa-plus me-1"></i>
            Novo Processo
          </router-link>
        </div>
      </div>

      <!-- Painel de filtros -->
      <div v-if="mostrarFiltros" class="card-body border-top">
        <form @submit.prevent="aplicarFiltros" class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Título</label>
            <input
              v-model="filtrosForm.titulo"
              type="text"
              class="form-control"
              placeholder="Buscar por título..."
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Número do Processo</label>
            <input
              v-model="filtrosForm.numeroProcesso"
              type="text"
              class="form-control"
              placeholder="Ex: 0001234-56.2023.8.02.0001"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Cliente</label>
            <input
              v-model="filtrosForm.cliente"
              type="text"
              class="form-control"
              placeholder="Nome do cliente..."
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select v-model="filtrosForm.status" class="form-select" multiple>
              <option value="ativo">Ativo</option>
              <option value="aguardando">Aguardando</option>
              <option value="suspenso">Suspenso</option>
              <option value="arquivado">Arquivado</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
          <div class="col-12 d-flex gap-2">
            <button type="submit" class="btn btn-outline-primary">
              <i class="fas fa-search me-1"></i>
              Aplicar Filtros
            </button>
            <button type="button" @click="limparFiltros" class="btn btn-outline-secondary">
              <i class="fas fa-times me-1"></i>
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista de processos -->
    <div class="row">
      <!-- Estado de carregamento -->
      <div v-if="carregandoLista" class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <p class="mt-2 text-muted">Carregando processos...</p>
      </div>

      <!-- Estado vazio -->
      <div v-else-if="!temProcessos" class="col-12">
        <div class="card text-center py-5">
          <div class="card-body">
            <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Nenhum processo encontrado</h5>
            <p class="text-muted">
              {{
                Object.keys(filtros).length > 0
                  ? "Tente ajustar os filtros de busca."
                  : "Comece criando seu primeiro processo."
              }}
            </p>
            <router-link
              v-if="Object.keys(filtros).length === 0"
              :to="{ name: 'processo-criar' }"
              class="btn btn-primary"
            >
              <i class="fas fa-plus me-1"></i>
              Criar Primeiro Processo
            </router-link>
          </div>
        </div>
      </div>

      <!-- Cards dos processos -->
      <div v-else>
        <div v-for="processo in processos" :key="processo.id" class="col-lg-6 col-xl-4 mb-4">
          <div class="card h-100 shadow-sm processo-card">
            <div class="card-header d-flex justify-content-between align-items-start">
              <div class="flex-grow-1">
                <h6 class="mb-1 text-truncate">{{ processo.titulo }}</h6>
                <small class="text-muted">{{ processo.numeroProcesso }}</small>
              </div>
              <span class="badge ms-2" :class="`bg-${formatters.statusParaCor(processo.status)}`">
                {{ processo.status }}
              </span>
            </div>

            <div class="card-body">
              <p class="card-text text-muted small mb-2">
                {{
                  processo.descricao.length > 100
                    ? processo.descricao.substring(0, 100) + "..."
                    : processo.descricao
                }}
              </p>

              <div class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-user me-1"></i>
                  <strong>Cliente:</strong> {{ processo.cliente }}
                </small>
              </div>

              <div class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-tag me-1"></i>
                  <strong>Tipo:</strong> {{ formatters.tipoProcessoLabel(processo.areaJuridica) }}
                </small>
              </div>

              <div class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-calendar me-1"></i>
                  <strong>Atualizado:</strong>
                  {{ formatters.formatarData(processo.dataAtualizacao) }}
                </small>
              </div>

              <div v-if="processo.valorCausa" class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-dollar-sign me-1"></i>
                  <strong>Valor:</strong> {{ formatters.formatarValorCausa(processo.valorCausa) }}
                </small>
              </div>
            </div>

            <div class="card-footer bg-transparent">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-1">
                  <span
                    v-if="processo.movimentacoes?.length"
                    class="badge bg-info"
                    :title="`${processo.movimentacoes.length} movimentações`"
                  >
                    <i class="fas fa-history me-1"></i>
                    {{ processo.movimentacoes.length }}
                  </span>
                  <span
                    v-if="processo.documentos?.length"
                    class="badge bg-secondary"
                    :title="`${processo.documentos.length} documentos`"
                  >
                    <i class="fas fa-file me-1"></i>
                    {{ processo.documentos.length }}
                  </span>
                </div>

                <router-link
                  :to="{ name: 'processo-detalhes', params: { id: processo.id } }"
                  class="btn btn-sm btn-outline-primary"
                >
                  <i class="fas fa-eye me-1"></i>
                  Ver Detalhes
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div v-if="temMaisItens && !carregandoLista" class="text-center mt-4">
      <button
        @click="carregarMaisProcessos"
        class="btn btn-outline-primary"
        :disabled="carregandoLista"
      >
        <i class="fas fa-chevron-down me-1"></i>
        Carregar Mais Processos
      </button>
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
import { onMounted, ref } from "vue";
import { formatters } from "../../../application/mappers/processoMappers";
import type { FiltrosProcessoDTO } from "../../../infrastructure/api/dtos";
import { useProcessoStore } from "../../stores/processoStore";

const processoStore = useProcessoStore();

// Estado reativo do store
const { processos, carregandoLista, erro, filtros, temProcessos, temMaisItens } =
  storeToRefs(processoStore);

// Estado local do componente
const mostrarFiltros = ref(false);
const filtrosForm = ref<FiltrosProcessoDTO>({});

// Actions do store
const {
  carregarProcessos,
  carregarMaisProcessos,
  limparErro,
  aplicarFiltros: aplicarFiltrosStore,
  limparFiltros: limparFiltrosStore,
} = processoStore;

// Métodos
function toggleFiltros() {
  mostrarFiltros.value = !mostrarFiltros.value;
}

function aplicarFiltros() {
  aplicarFiltrosStore(filtrosForm.value);
}

function limparFiltros() {
  filtrosForm.value = {};
  limparFiltrosStore();
}

// Carregamento inicial
onMounted(() => {
  carregarProcessos();
});
</script>

<style scoped>
.processo-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.processo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.card-text {
  line-height: 1.4;
}

.badge {
  font-size: 0.75em;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
