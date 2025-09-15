<script setup lang="ts">
import Editor from "primevue/editor";
import { ref } from "vue";

const content = ref();
</script>

<template>
  <div class="card" style="height: 100%">
    <div class="card-header">
      <RouterLink :to="{ name: 'login' }">
        <h1>Teste</h1>
      </RouterLink>
    </div>
    <div class="card-body d-flex flex-column overflow-y-auto">
      <Editor v-model="content" style="height: 95%" />
    </div>
    <div class="card-footer">teste</div>
  </div>
</template>
