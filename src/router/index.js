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
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      bottomBarShow: true,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
    meta: {
      bottomBarShow: true,
    },
  },
  {
    path: "/user/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/user/info",
    name: "UserInfo",
    component: () => import("../views/UserInfo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
