import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import jwt from "jsonwebtoken";
import config from "@/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: "home",
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
});

function checkToken(token: string) {
  return jwt.verify(token, config.jwtPublicKey);
}

router.beforeEach((to, from, next) => {

  const TAG = "[BEFORE EACH]";
  console.log(`${TAG} start.`);

  if (to.meta.needLogin) {
    // 每次跳转到需要登录的接口前
    // 检查是否有已经登录的标志，token 是否过期，如果没有或token过期了就跳转登录页
    const token = window.localStorage.getItem("token") || "";
    if (token === "") {
      console.error("token is empty.");
      next("login");
    }
    
    try{
      console.log(`${TAG} pk: ${config.jwtPublicKey}`)
      const result = checkToken(token);
      console.log(`${TAG} result: `, result);
      // todo here
      
    } catch (e) {
      console.error(`${TAG} invalid token.`)
      next("login");
    }
    
    next();

  } else {
    next();
  }
})

export default router
