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
  ],
});

export default router;
