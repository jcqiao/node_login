/*
 * @FilePath: \node登录注册\vue\src\main.js
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/assets/js/http";
import $ from "jquery"; //在需要使用的页面中

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$http = http;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
