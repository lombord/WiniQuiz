import { inject } from "vue";
import { createRouter, createWebHistory } from "vue-router";

function IfAuthenticated(from, to) {
  const session = inject("session");
  if (!session.isAuthenticated) {
    return { name: "login" };
  }
}

function IfNotAuthenticated(from, to) {
  const session = inject("session");
  if (session.isAuthenticated) {
    if (!from.meta.requiresAuth) return { name: "home" };
    return from;
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/quiz/",
    name: "quiz",
    component: () => import("@/views/GameView.vue"),
  },
  {
    path: "/leaders/",
    name: "leaders",
    component: () => import("@/views/LeadersView.vue"),
  },
  {
    path: "/login/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    beforeEnter: IfNotAuthenticated,
  },
  {
    path: "/register/",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
    beforeEnter: IfNotAuthenticated,
  },
  {
    path: "/logout/",
    name: "logout",
    component: () => import("@/views/LogoutView.vue"),
  },
];

routes.forEach((route) => {
  if (!route.beforeEnter) {
    route.beforeEnter = IfAuthenticated;
    (route.meta || (route.meta = {})).requiresAuth = true;
  }
});

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
