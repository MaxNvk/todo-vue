<template>
  <main class="container">
    <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    <AddButton
      v-if="!notes.length"
      class="w-100"
      to="/note/new"
      style="height: 150px"
    />
  </main>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import AddButton from "@/components/Buttons/AddButton.vue";

export default {
  name: "Home",
  components: { NoteCard, AddButton },
  computed: {
    // import notes from vuex state
    notes() {
      return this.$store.state.notes;
    }
  }
};
</script>
