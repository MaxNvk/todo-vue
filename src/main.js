import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import our modal plugin
import Modal from "@/plugins/modal.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusSquare,
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlusSquare,
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faChevronLeft,
  faChevronRight
);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);

// use modal plugin
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
