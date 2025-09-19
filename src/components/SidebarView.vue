<script setup lang="ts">
import mainFramePropsStore from "@/app/stores/mainFrameStore";
import SideBar from "@/assets/styled/sidebar";
import { storeToRefs } from "pinia";
import MaterialSymbolsAdd2Rounded from "~icons/material-symbols/add-2-rounded?width=48px&height=48px";
import MaterialSymbolsGavel from "~icons/material-symbols/gavel?width=48px&height=48px";
import MdiSpeedometer from "~icons/mdi/speedometer?width=48px&height=48px";

const { widthSidebar, translateX, toggleSidebar } = storeToRefs(mainFramePropsStore());
// Computed para verificar se a sidebar está colapsada
import { computed } from "vue";
const isCollapsed = computed(() => widthSidebar.value != "250px"); // ajuste conforme necessário
</script>

<template>
  <SideBar :width="widthSidebar" :translatepx="translateX">
    <div class="sidebar-content h-100 d-flex flex-column pt-5">
      <!-- Logo/Brand -->
      <div class="sidebar-header p-3 border-bottom" @click="toggleSidebar = !toggleSidebar">
        <h6 class="text-white mb-0 fw-bold">JurisREM</h6>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav flex-grow-1 p-2">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link
              :to="{ name: 'dashboard' }"
              class="nav-link text-white d-flex"
              active-class="active"
            >
              <MdiSpeedometer />
              <Transition name="sidebar-fade" mode="out-in">
                <span v-if="!isCollapsed" class="sidebar-text fw-bold fs-5">Dashboard</span>
              </Transition>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'processos-lista' }"
              class="nav-link text-white d-flex align-items-center"
              active-class="active"
            >
              <MaterialSymbolsGavel />
              <Transition name="sidebar-fade" mode="out-in">
                <span v-if="!isCollapsed" class="sidebar-text fw-bold fs-5"> Processos </span>
              </Transition>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              :to="{ name: 'processo-criar' }"
              class="nav-link text-white d-flex align-items-center"
              active-class="active"
            >
              <MaterialSymbolsAdd2Rounded />
              <Transition name="sidebar-fade" mode="out-in">
                <span v-if="!isCollapsed" class="sidebar-text fw-bold fs-5"> Novo Processo </span>
              </Transition>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-3 border-top">
        <small class="text-white-50 sidebar-text fw-bold fs-6">v0.1.0</small>
        <Transition name="sidebar-fade" mode="out-in">
          <RouterLink
            v-if="!isCollapsed"
            @click="toggleSidebar = false"
            :to="{ name: 'login' }"
            class="ms-3 sidebar-text"
          >
            Logout
          </RouterLink>
        </Transition>
      </div>
    </div>
  </SideBar>
</template>

<style scoped>
.nav-link {
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  transition: all 0.5s ease;
  height: 65px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white !important;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white !important;
}

.sidebar-text {
  transition: opacity 0.6s ease;
  margin-left: 10px;
  align-content: center;
}

.sidebar-text {
  white-space: nowrap;
  z-index: 10;
}

/* Transição suave para o texto da sidebar */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.25, 0, 0.25, 0.25),
    transform 0.1s cubic-bezier(0.25, 0, 0.25, 0.25);
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
