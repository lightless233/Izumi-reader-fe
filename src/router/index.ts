import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import jwt, { TokenExpiredError } from "jsonwebtoken";
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
    meta: { needLogin: true },
    children: [
      {
        path: "addFeed",
        component: () => import("@/views/feed/AddFeed.vue"),
      }
    ]
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

    try {
      const result = jwt.verify(token, config.jwtPublicKey);
      console.log(`${TAG} jwt result: `, result);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log(`${TAG} token expired..`);
        next("login");
      } else {
        console.log(`${TAG} Invalid Token, error: `, error);
        next("login");
      }
    }
    next();
  } else {
    next();
  }
})

export default router;
