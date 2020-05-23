<template>
  <div @keydown.esc="hide" v-if="isShown" class="modal">
    <div class="modal-content text-center">
      <p class="modal-title">{{ title }}</p>

      <button class="modal-close" tabindex="-1" @click="hide">
        <FontAwesomeIcon icon="times" />
      </button>

      <div class="modal-footer d-flex justify-center">
        <button
          tabindex="0"
          ref="submitButton"
          class="button save"
          @click="submit"
        >
          Submit
        </button>

        <button tabindex="0" class="button cancel" @click="hide">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// we must import our Modal plugin instance
// because it contains reference to our Eventbus
import Modal from "@/plugins/modal.js";

export default {
  data: () => ({
    title: null,
    isShown: false,
    onSubmit: {}
  }),
  beforeMount() {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    Modal.EventBus.$on("show", params => {
      this.show(params);
    });
  },
  methods: {
    async show(params) {
      // making modal visible
      this.isShown = true;
      // setting title
      this.title = params.title;
      // setting callback function
      this.onSubmit = params.onSubmit;

      // on next tick focus on submit button
      await this.$nextTick(() => {
        this.$refs.submitButton.focus();
      });
    },
    hide() {
      this.isShown = false;
    },
    submit() {
      // we must check if this.onSubmit is function
      if (typeof this.onSubmit === "function") {
        // run passed function and then close the modal
        this.onSubmit();
        this.hide();
      } else {
        // we only close the modal
        this.hide();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($black, 0.5);
  z-index: 3;
}

.modal-content {
  position: absolute;
  background: $white;
  max-width: 525px;
  width: 100%;
  padding: 30px;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
}

.modal-footer {
  margin-top: 30px;
}

.modal-close {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
