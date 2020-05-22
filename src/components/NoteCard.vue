<template>
  <router-link :to="`/note/${note.id}`" class="note-card d-flex flex-wrap">
    <div class="d-flex w-100 justify-between">
      <p class="note-card__title w-100">{{ note.title }}</p>

      <RemoveButton @click.native.prevent="callModalRemoveNote" />
    </div>

    <ul :to="`/note/${note.id}`" class="w-100">
      <li v-for="(item, key) in croppedTasks" :key="key">
        <TodoItem v-model="croppedTasks[key]" :disabled="true" />
      </li>
      <li class="note-card__dots" v-if="this.note.tasks.length > 3">. . .</li>
    </ul>
  </router-link>
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
        title: `Are you sure want to remove "${this.note.title}" note?`,
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
  margin-bottom: 30px;
  padding: 30px 15px;

  @media (min-width: $min-md) {
    padding: 30px;
  }
}

.note-card__title {
  color: $white;
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 30px;
}

.note-card__dots {
  font-size: 24px;
  font-weight: 700;
  color: $white;
  padding-left: 45px;
}
</style>
