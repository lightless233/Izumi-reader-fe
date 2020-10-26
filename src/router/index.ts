import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: "home", component: () => import("@/views/Home.vue") },
  { path: '/home', name: "home2", component: () => import("@/views/Home.vue") },
  { path: "/login", name: "login", component: () => import("@/views/Login.vue") },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
