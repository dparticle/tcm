import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vant from "vant";
import "vant/lib/index.css";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(VueAxios, axios);  // http 请求

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
