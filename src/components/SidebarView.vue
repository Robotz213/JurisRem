<script setup lang="ts">
import mainFramePropsStore from "@/app/stores/mainFrameStore";
import SideBar from "@/assets/styled/sidebar";
import { storeToRefs } from "pinia";
const { widthSidebar, translateX } = storeToRefs(mainFramePropsStore());
</script>

<template>
  <SideBar :width="widthSidebar" :translatepx="translateX">
    <div class="sidebar-content h-100 d-flex flex-column">
      <!-- Logo/Brand -->
      <div class="sidebar-header p-3 border-bottom">
        <h6 class="text-white mb-0">JurisREM</h6>
      </div>
      
      <!-- Navigation Menu -->
      <nav class="sidebar-nav flex-grow-1 p-2">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link 
              :to="{ name: 'dashboard' }" 
              class="nav-link text-white d-flex align-items-center"
              active-class="active"
            >
              <i class="fas fa-home me-2"></i>
              <span class="sidebar-text">Dashboard</span>
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link 
              :to="{ name: 'processos-lista' }" 
              class="nav-link text-white d-flex align-items-center"
              active-class="active"
            >
              <i class="fas fa-gavel me-2"></i>
              <span class="sidebar-text">Processos</span>
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link 
              :to="{ name: 'processo-criar' }" 
              class="nav-link text-white d-flex align-items-center"
              active-class="active"
            >
              <i class="fas fa-plus me-2"></i>
              <span class="sidebar-text">Novo Processo</span>
            </router-link>
          </li>
        </ul>
      </nav>
      
      <!-- Footer -->
      <div class="sidebar-footer p-3 border-top">
        <small class="text-white-50 sidebar-text">v0.1.0</small>
      </div>
    </div>
  </SideBar>
</template>

<style scoped>
.sidebar-content {
  overflow-y: auto;
}

.nav-link {
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s ease;
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
  transition: opacity 0.2s ease;
}

/* Hide text when sidebar is collapsed */
@media (max-width: 768px) {
  .sidebar-text {
    display: none;
  }
}
</style>
