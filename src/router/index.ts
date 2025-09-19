import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/app/dashboard/components/DashboardView.vue"),
      meta: {
        isLogged: true,
      },
    },

    // Rotas de processos
    {
      path: "/processos",
      name: "processos-lista",
      component: () => import("@/app/processos/components/ProcessosList.vue"),
      meta: {
        isLogged: true,
      },
    },
    {
      path: "/processos/novo",
      name: "processo-criar",
      component: () => import("@/app/processos/components/ProcessoForm.vue"),
      meta: {
        isLogged: true,
      },
    },
    {
      path: "/processos/:id",
      name: "processo-detalhes",
      component: () => import("@/app/processos/components/ProcessoDetalhes.vue"),
      meta: {
        isLogged: true,
      },
    },
    {
      path: "/processos/:id/editar",
      name: "processo-editar",
      component: () => import("@/app/processos/components/ProcessoForm.vue"),
      meta: {
        isLogged: true,
      },
    },
  ],
});

export default router;
