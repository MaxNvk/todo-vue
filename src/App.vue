<template>
  <div id="app">
    <BaseHeader />
    <router-view />
    <AppModal />
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  components: {
    BaseHeader
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/styles";
</style>
