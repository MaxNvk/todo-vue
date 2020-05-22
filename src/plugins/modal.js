import AppModal from "@/components/AppModal.vue";

const Modal = {
  install(Vue) {
    this.EventBus = new Vue();

    Vue.component("AppModal", AppModal);

    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit("show", params);
      }
    };
  }
};

export default Modal;
