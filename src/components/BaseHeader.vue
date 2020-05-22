<template>
  <header class="header d-flex justify-between align-center">
    <router-link to="/" class="logo">ToDo-List</router-link>

    <div class="header__buttons d-flex">
      <router-link to="/note/new">
        <AddButton tabindex="-1" />
      </router-link>
    </div>
  </header>
</template>

<script>
import AddButton from "@/components/Buttons/AddButton.vue";

export default {
  components: {
    AddButton
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: $white;
  height: 70px;
  padding: 0 15px;

  @media (min-width: $min-md) {
    padding: 0 40px;
  }
}

.logo {
  font-size: 32px;
  font-weight: 700;
  color: lighten($black, 5);
  user-select: none;
}
</style>
