<template>
  <div class="processo-form">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <router-link
            :to="{ name: 'processos-lista' }"
            class="btn btn-sm btn-outline-secondary me-3"
          >
            <i class="fas fa-arrow-left me-1"></i>
            Voltar
          </router-link>
          <h4 class="mb-0">
            <i class="fas fa-gavel me-2"></i>
            {{ isEdicao ? "Editar Processo" : "Novo Processo" }}
          </h4>
        </div>
      </div>

      <div class="card-body">
        <form @submit.prevent="salvarProcesso" novalidate>
          <div class="row">
            <!-- Informações básicas -->
            <div class="col-lg-8">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="numeroProcesso" class="form-label">
                    Número do Processo <span class="text-danger">*</span>
                  </label>
                  <input
                    id="numeroProcesso"
                    v-model="form.numeroProcesso"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': erros.numeroProcesso }"
                    placeholder="Ex: 0001234-56.2023.8.02.0001"
                    required
                  />
                  <div v-if="erros.numeroProcesso" class="invalid-feedback">
                    {{ erros.numeroProcesso }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="cliente" class="form-label">
                    Cliente <span class="text-danger">*</span>
                  </label>
                  <input
                    id="cliente"
                    v-model="form.cliente"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': erros.cliente }"
                    placeholder="Nome do cliente"
                    required
                  />
                  <div v-if="erros.cliente" class="invalid-feedback">
                    {{ erros.cliente }}
                  </div>
                </div>

                <div class="col-12 mb-3">
                  <label for="titulo" class="form-label">
                    Título do Processo <span class="text-danger">*</span>
                  </label>
                  <input
                    id="titulo"
                    v-model="form.titulo"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': erros.titulo }"
                    placeholder="Título ou assunto principal do processo"
                    required
                  />
                  <div v-if="erros.titulo" class="invalid-feedback">
                    {{ erros.titulo }}
                  </div>
                </div>

                <div class="col-12 mb-3">
                  <label for="descricao" class="form-label">
                    Descrição <span class="text-danger">*</span>
                  </label>
                  <textarea
                    id="descricao"
                    v-model="form.descricao"
                    class="form-control"
                    :class="{ 'is-invalid': erros.descricao }"
                    rows="4"
                    placeholder="Descrição detalhada do processo..."
                    required
                  ></textarea>
                  <div v-if="erros.descricao" class="invalid-feedback">
                    {{ erros.descricao }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="tipo" class="form-label">
                    Tipo de Processo <span class="text-danger">*</span>
                  </label>
                  <select
                    id="tipo"
                    v-model="form.areaJuridica"
                    class="form-select"
                    :class="{ 'is-invalid': erros.areaJuridica }"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="civil">Civil</option>
                    <option value="criminal">Criminal</option>
                    <option value="trabalhista">Trabalhista</option>
                    <option value="tributario">Tributário</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="familia">Família</option>
                    <option value="empresarial">Empresarial</option>
                  </select>
                  <div v-if="erros.areaJuridica" class="invalid-feedback">
                    {{ erros.areaJuridica }}
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select
                    id="status"
                    v-model="form.status"
                    class="form-select"
                    :disabled="!isEdicao"
                  >
                    <option value="rascunho">Rascunho</option>
                    <option value="ativo">Ativo</option>
                    <option value="aguardando">Aguardando</option>
                    <option value="suspenso">Suspenso</option>
                    <option value="arquivado">Arquivado</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                  <div v-if="!isEdicao" class="form-text">
                    Novos processos são criados como "Rascunho"
                  </div>
                </div>
              </div>
            </div>

            <!-- Informações adicionais -->
            <div class="col-lg-4">
              <div class="bg-light p-3 rounded">
                <h6 class="mb-3">
                  <i class="fas fa-info-circle me-1"></i>
                  Informações Adicionais
                </h6>

                <div class="mb-3">
                  <label for="parteContraria" class="form-label">Parte Contrária</label>
                  <input
                    id="parteContraria"
                    v-model="form.parteContraria"
                    type="text"
                    class="form-control"
                    placeholder="Nome da parte contrária"
                  />
                </div>

                <div class="mb-3">
                  <label for="tribunal" class="form-label">Tribunal/Vara</label>
                  <input
                    id="tribunal"
                    v-model="form.tribunal"
                    type="text"
                    class="form-control"
                    placeholder="Ex: 1ª Vara Cível de São Paulo"
                  />
                </div>

                <div class="mb-3">
                  <label for="valorCausa" class="form-label">Valor da Causa (R$)</label>
                  <input
                    id="valorCausa"
                    v-model="valorCausaFormatted"
                    type="text"
                    class="form-control"
                    placeholder="R$ 0,00"
                    @input="formatarValorCausa"
                  />
                  <div class="form-text">Valor monetário da causa em reais</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="d-flex justify-content-end gap-2 pt-3 border-top">
            <router-link :to="{ name: 'processos-lista' }" class="btn btn-outline-secondary">
              <i class="fas fa-times me-1"></i>
              Cancelar
            </router-link>

            <button type="submit" class="btn btn-primary" :disabled="salvando">
              <span v-if="salvando" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="fas fa-save me-1"></i>
              {{ isEdicao ? "Atualizar" : "Criar" }} Processo
            </button>
          </div>
        </form>
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Processo } from "../../../domain/entities/Processo";
import { StatusProcesso, TipoProcesso } from "../../../domain/entities/Processo";
import { useProcessoStore } from "../../stores/processoStore";

const route = useRoute();
const router = useRouter();
const processoStore = useProcessoStore();

// Estado reativo do store
const { processoAtual, salvando, erro } = storeToRefs(processoStore);

// Actions do store
const {
  carregarProcessoDetalhes,
  criarProcesso,
  atualizarProcesso,
  limparErro,
  limparProcessoAtual,
} = processoStore;

// Estado local
const form = ref({
  numeroProcesso: "",
  titulo: "",
  descricao: "",
  areaJuridica: "" as TipoProcesso | "",
  status: StatusProcesso.RASCUNHO,
  cliente: "",
  parteContraria: "",
  tribunal: "",
  valorCausa: undefined as number | undefined,
});

const erros = ref<Record<string, string>>({});
const valorCausaFormatted = ref("");

// Computed
const isEdicao = computed(() => !!route.params.id);

const processoId = computed(() => route.params.id as string);

// Métodos
function validarFormulario(): boolean {
  erros.value = {};
  let isValido = true;

  // Campos obrigatórios
  if (!form.value.numeroProcesso.trim()) {
    erros.value.numeroProcesso = "Número do processo é obrigatório";
    isValido = false;
  }

  if (!form.value.titulo.trim()) {
    erros.value.titulo = "Título é obrigatório";
    isValido = false;
  }

  if (!form.value.descricao.trim()) {
    erros.value.descricao = "Descrição é obrigatória";
    isValido = false;
  }

  if (!form.value.cliente.trim()) {
    erros.value.cliente = "Cliente é obrigatório";
    isValido = false;
  }

  if (!form.value.areaJuridica) {
    erros.value.areaJuridica = "Tipo de processo é obrigatório";
    isValido = false;
  }

  // Validações específicas
  if (
    form.value.numeroProcesso &&
    !/^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/.test(form.value.numeroProcesso)
  ) {
    erros.value.numeroProcesso = "Formato inválido. Use: 0001234-56.2023.8.02.0001";
    isValido = false;
  }

  return isValido;
}

async function salvarProcesso() {
  if (!validarFormulario()) {
    return;
  }

  try {
    const dadosProcesso = {
      ...form.value,
      areaJuridica: form.value.areaJuridica as TipoProcesso,
    };

    if (isEdicao.value) {
      await atualizarProcesso(processoId.value, dadosProcesso);
      router.push({ name: "processo-detalhes", params: { id: processoId.value } });
    } else {
      const novoProcesso = await criarProcesso(dadosProcesso);
      router.push({ name: "processo-detalhes", params: { id: novoProcesso.id } });
    }
  } catch (error) {
    // Erro já tratado no store
    console.error("Erro ao salvar processo:", error);
  }
}

function formatarValorCausa(event: Event) {
  const target = event.target as HTMLInputElement;
  let valor = target.value;

  // Remove caracteres não numéricos
  valor = valor.replace(/\D/g, "");

  // Converte para número em centavos
  const numeroValor = parseInt(valor) || 0;
  form.value.valorCausa = numeroValor;

  // Formatar para exibição
  if (numeroValor === 0) {
    valorCausaFormatted.value = "";
  } else {
    const valorReais = numeroValor / 100;
    valorCausaFormatted.value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorReais);
  }
}

function carregarDadosFormulario(processo: Processo) {
  form.value = {
    numeroProcesso: processo.numeroProcesso,
    titulo: processo.titulo,
    descricao: processo.descricao,
    areaJuridica: processo.areaJuridica,
    status: processo.status,
    cliente: processo.cliente,
    parteContraria: processo.parteContraria || "",
    tribunal: processo.tribunal || "",
    valorCausa: processo.valorCausa,
  };

  // Formatar valor da causa para exibição
  if (processo.valorCausa) {
    const valorReais = processo.valorCausa / 100;
    valorCausaFormatted.value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorReais);
  }
}

// Watchers
watch(processoAtual, (novoProcesso) => {
  if (novoProcesso && isEdicao.value) {
    carregarDadosFormulario(novoProcesso);
  }
});

// Lifecycle
onMounted(async () => {
  if (isEdicao.value) {
    await carregarProcessoDetalhes(processoId.value);
  } else {
    // Valores padrão para novo processo
    form.value.status = StatusProcesso.RASCUNHO;
  }
});

onMounted(() => {
  return () => {
    limparProcessoAtual();
    limparErro();
  };
});
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}

.form-label {
  font-weight: 500;
}

.text-danger {
  color: #dc3545 !important;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
