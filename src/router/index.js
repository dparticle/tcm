import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      bottomBarShow: true,
      keepAlive: true,
    },
  },
  {
    path: "/storehouse",
    name: "StoreHouse",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StoreHouse.vue"),
    meta: {
      bottomBarShow: true,
      keepAlive: true,
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/user/User.vue"),
    meta: {
      bottomBarShow: true,
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/user/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/user/Register.vue"),
  },
  {
    path: "/user/:phone",
    name: "UserInfo",
    component: () => import("../views/user/UserInfo.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/tcm/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
  },
  {
    path: "/star",
    name: "Star",
    component: () => import("../views/Star.vue"),
  },
];

const router = new VueRouter({
  // 真机运行必须设置为 hash，否则会出现白屏
  mode: "hash",
  routes,
});

export default router;
