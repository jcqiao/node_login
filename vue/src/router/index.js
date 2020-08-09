/*
 * @FilePath: \node登录注册\vue\src\router\index.js
 */
import Vue from "vue";
import Router from "vue-router";
import login from "@/pages/login";
import register from "@/pages/register";
import main from "@/pages/main";

Vue.use(Router);

// 设置默认路由
let defaultRouter = [];
// 设置其他角色路由
let routerMap = {};

// 设置通用路由
let routerArr = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/main",
    name: "main",
    component: main,
  },
  { path: "/", redirect: "login" },
];
const router = new Router({
  // mode: 'history',
  routes: routerArr,
});
//路由跳转之前
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !localStorage.token) {
//     return next('/login')
//   }
//    next()
// })

export default router;
