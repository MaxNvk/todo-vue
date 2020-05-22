<template>
  <button type="button" :class="'size-' + size">
    <FontAwesomeIcon icon="trash" />
  </button>
</template>

<script>
export default {
  props: {
    size: String
  }
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;

  background: rgba($red, 0.1);
  color: $red;
  font-size: 20px;

  &.size-lg {
    font-size: 24px;
    height: 43px;
    width: 43px;
  }

  &:hover {
    background: rgba($red, 0.2);
  }
}
</style>
