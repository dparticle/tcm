import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/storehouse",
    name: "StoreHouse",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StoreHouse.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
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
];

const router = new VueRouter({
  routes,
});

export default router;
