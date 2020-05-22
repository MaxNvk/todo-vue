<template>
  <div class="note-card d-flex flex-wrap">
    <div class="d-flex w-100 justify-between">
      <router-link :to="`/note/${note.id}`" class="note-card__title w-100">{{
        note.title
      }}</router-link>

      <RemoveButton @click.native="callModalRemoveNote" />
    </div>

    <router-link :to="`/note/${note.id}`" class="w-100">
      <div v-for="(item, key) in croppedTasks" :key="key">
        <TodoItem v-model="croppedTasks[key]" :disabled="true" />
      </div>
    </router-link>
  </div>
</template>

<script>
import RemoveButton from "@/components/Buttons/RemoveButton.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  components: { RemoveButton, TodoItem },
  props: {
    note: {
      type: Object
    }
  },
  computed: {
    croppedTasks() {
      return this.note.tasks.slice(0, 3);
    }
  },
  methods: {
    callModalRemoveNote() {
      this.$modal.show({
        title: "Are you sure want to remove note?",
        onSubmit: this.removeNote
      });
    },
    removeNote() {
      this.$store.commit("REMOVE_NOTE", this.note.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.note-card {
  border: 4px dashed $black;
  background: darken($cyan, 8);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
}

.note-card__title {
  color: $white;
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 30px;
}
</style>
