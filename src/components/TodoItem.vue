<template>
  <div
    class="todo-item d-flex justify-between align-center"
    :class="{ done: value.value.toString() == 'true' }"
  >
    <input
      :id="`check-${value.id}`"
      type="checkbox"
      :checked="value.value.toString() == 'true'"
      :value="value.value.toString() == 'true' ? false : true"
      @input="update('value', $event.target.value)"
      :disabled="disabled"
      hidden
    />
    <label
      class="phantom-checkbox d-flex justify-center align-center"
      :for="`check-${value.id}`"
    >
      <FontAwesomeIcon icon="check" v-if="value.value.toString() == 'true'" />
    </label>

    <input
      ref="todoInput"
      class="todo-item__text"
      type="text"
      :value="value.title"
      @input="update('title', $event.target.value)"
      :disabled="disabled"
      @keydown.backspace="handleDelete"
    />

    <RemoveButton v-if="!disabled" @click.native="handleDeleteButton" />
  </div>
</template>

<script>
import RemoveButton from "@/components/Buttons/RemoveButton.vue";

export default {
  name: "TodoItem",
  components: { RemoveButton },
  props: {
    value: Object,
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    update(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    },
    handleDeleteButton() {
      this.$emit("delete", this.value.id);
    },
    handleDelete() {
      if (!this.value.title.length) {
        this.$emit("delete", this.value.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-item {
  margin-bottom: 20px;
}

.todo-item__text {
  font-weight: 600;
  border: none;
  border-bottom: 2px dashed $black;
  flex-grow: 1;
  background: transparent;
  margin: 0 15px;

  &:disabled {
    border: none !important;
    color: $white;
  }

  &:focus {
    border-bottom: 2px dashed $blue;
  }
}

.phantom-checkbox {
  width: 27px;
  height: 27px;
  border: 2px dotted $black;
  cursor: pointer;

  input[type="checkbox"]:disabled + & {
    color: $white !important;
    border-color: $white !important;
  }

  &:hover {
    color: lighten($blue, 25);
    border-color: lighten($blue, 25);
  }

  .todo-item.done & {
    color: $green;
    border-color: $green;
  }
}
</style>
