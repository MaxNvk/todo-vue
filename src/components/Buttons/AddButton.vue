<template>
  <button>
    <FontAwesomeIcon icon="plus-square" />
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;

  background: rgba($blue, 0.1);
  color: $blue;
  font-size: 24px;

  &:hover {
    background: rgba($blue, 0.2);
  }
}
</style>
