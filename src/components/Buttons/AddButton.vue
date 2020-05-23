<template>
  <component class="add-button" :is="componentTag" :to="to">
    <FontAwesomeIcon icon="plus-square" />
  </component>
</template>
<script>
export default {
  props: {
    to: String
  },
  computed: {
    componentTag() {
      if (!this.to || !this.to.length) {
        return "button";
      }

      return "router-link";
    }
  }
};
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;

  background: rgba($blue, 0.1);
  color: $blue;
  font-size: 24px;
  border-radius: 6px;

  &:hover {
    background: rgba($blue, 0.2);
  }
}
</style>
