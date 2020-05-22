<template>
  <main class="container">
    <NoteCard v-for="(note, key) in notes" :key="key" :note="note" />
  </main>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";

export default {
  name: "Home",
  components: { NoteCard },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  }
};
</script>
