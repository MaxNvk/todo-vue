<template>
  <button>
    <FontAwesomeIcon icon="edit" />
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  text-align: center;

  background: rgba($yellow, 0.1);
  color: $yellow;
  font-size: 18px;

  &:hover {
    background: rgba($yellow, 0.2);
  }
}
</style>
