import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

export const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");
