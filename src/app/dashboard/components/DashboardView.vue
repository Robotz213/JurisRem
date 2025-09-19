<script setup lang="ts">
import Editor from "primevue/editor";
import { ref } from "vue";

const content = ref();
</script>

<template>
  <div class="card" style="height: 100%">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h1>Dashboard JurisREM</h1>
        <router-link :to="{ name: 'processos-lista' }" class="btn btn-primary">
          <i class="fas fa-gavel me-1"></i>
          Gerenciar Processos
        </router-link>
      </div>
    </div>
    <div class="card-body d-flex flex-column overflow-y-auto">
      <!-- Cards de resumo -->
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-gavel fa-2x me-3"></i>
                <div>
                  <h5 class="mb-0">Processos Ativos</h5>
                  <small>Acompanhe seus casos</small>
                </div>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0">
              <router-link :to="{ name: 'processos-lista' }" class="text-white text-decoration-none">
                Ver todos <i class="fas fa-arrow-right ms-1"></i>
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card bg-success text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-plus fa-2x me-3"></i>
                <div>
                  <h5 class="mb-0">Novo Processo</h5>
                  <small>Criar um novo caso</small>
                </div>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0">
              <router-link :to="{ name: 'processo-criar' }" class="text-white text-decoration-none">
                Criar agora <i class="fas fa-arrow-right ms-1"></i>
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card bg-info text-white">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <i class="fas fa-file fa-2x me-3"></i>
                <div>
                  <h5 class="mb-0">Documentos</h5>
                  <small>Gerencie anexos</small>
                </div>
              </div>
            </div>
            <div class="card-footer bg-transparent border-0">
              <span class="text-white">
                Em breve <i class="fas fa-clock ms-1"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Editor -->
      <div class="flex-grow-1">
        <Editor v-model="content" style="height: 400px" />
      </div>
    </div>
    <div class="card-footer">
      <small class="text-muted">Sistema de Gestão Processual JurisREM</small>
    </div>
  </div>
</template>
