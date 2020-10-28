import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { needLogin: true }
  },
  {
    path: '/home',
    name: "home2",
    component: () => import("@/views/Home.vue"),
    meta: { needLogin: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { needLogin: false }
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/Error.vue"),
    meta: { needLogin: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    // 每次跳转到需要登录的接口前
    // 检查是否有已经登录的标志，token 是否过期，如果没有或token过期了就跳转登录页
    const token = window.localStorage.getItem("token") || "";
    if (token === "") {
      console.error("token is empty.");
      next("login");
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
