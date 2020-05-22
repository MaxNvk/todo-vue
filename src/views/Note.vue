<template>
  <form @submit.prevent="saveChanges" class="container">
    <div class="d-flex">
      <input class="note-title" type="text" v-model="note.title" />

      <RemoveButton
        class="ml-15"
        size="lg"
        @click.native="callModalRemoveNote"
      />
    </div>

    <div class="todos">
      <TodoItem
        v-for="(item, i) in note.tasks"
        :key="i"
        v-model="note.tasks[i]"
        @delete="deleteTodo"
      />

      <AddButton class="w-100" @click.prevent.native="addTodo" />
    </div>

    <div
      v-if="changed && id != 'new'"
      class="note-footer d-flex justify-center align-center"
    >
      <button class="button save" type="submit">Save changes</button>

      <button @click.prevent="callModalCancel" class="button cancel">
        Cancel changes
      </button>
    </div>
    <div
      v-else-if="id == 'new'"
      class="note-footer d-flex justify-center align-center"
    >
      <button class="button save" type="submit">Save changes</button>
    </div>
  </form>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import RemoveButton from "@/components/Buttons/RemoveButton.vue";

export default {
  components: { TodoItem, AddButton, RemoveButton },

  props: {
    id: String
  },

  computed: {
    stateNote() {
      return this.$store.getters.getNoteById(this.id);
    }
  },

  async created() {
    if (this.id != "new") {
      this.note = JSON.parse(JSON.stringify(this.stateNote));
      await this.$nextTick();

      this.changed = false;
    } else {
      this.note.id = this.$store.getters.lastNoteId + 1;
    }
  },

  data: () => ({
    note: {
      id: null,
      title: null,
      tasks: []
    },

    changed: false
  }),

  methods: {
    saveChanges() {
      this.$store.commit("SAVE_NOTE", this.note);
      this.changed = false;

      if (this.id == "new") {
        this.$router.push(`/note/${this.note.id}`);
      }
    },

    async cancelChanges() {
      this.note = JSON.parse(JSON.stringify(this.stateNote));

      await this.$nextTick();

      this.changed = false;
    },

    removeNote() {
      this.$router.push("/");
      this.$store.commit("REMOVE_NOTE", this.note.id);
    },

    callModalRemoveNote() {
      this.$modal.show({
        title: "Are you sure want to remove note?",
        onSubmit: this.removeNote
      });
    },

    callModalCancel() {
      this.$modal.show({
        title: "Are you sure want to cancel changes?",
        onSubmit: this.cancelChanges
      });
    },

    addTodo() {
      if (this.note.tasks.length) {
        const id = this.note.tasks[this.note.tasks.length - 1].id + 1;
        this.note.tasks.push({ id, title: "", value: "" });
      } else {
        this.note.tasks.push({ id: 0, title: "", value: "" });
      }
    },

    deleteTodo(id) {
      const index = this.note.tasks.findIndex(task => task.id === id);
      this.note.tasks.splice(index, 1);
    }
  },
  watch: {
    note: {
      handler(newVal, oldVal) {
        if (oldVal != null) {
          this.changed = true;
        }
      },
      immediate: true,
      deep: true
    },
    id: {
      handler(newVal) {
        if (newVal == "new") {
          this.note = {
            id: this.$store.getters.lastNoteId + 1,
            title: null,
            tasks: []
          };
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.note-title {
  font-size: 32px;
  font-weight: 700;
  border: none;
  border-bottom: 3px dashed $black;
  width: 100%;
  margin-bottom: 60px;

  &:focus {
    border-bottom: 3px dashed $blue;
  }
}

.note-footer {
  margin-top: 30px;
}
</style>
