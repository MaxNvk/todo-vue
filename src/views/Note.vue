<template>
  <form @submit.prevent="saveChanges" class="container">
    <div class="state-change-buttons d-flex">
      <!-- :disabled is active when currentStateId is equal to 0,
        it means that 'clonedStates' array contains only first started state -->

      <!-- @blur event changes 'walkInTime' option, which helps app to 
        understand in which mode the note is -->
      <button
        :disabled="!currentStateId"
        type="button"
        class="button"
        @click.prevent="prevStep"
        @blur="walkInTime = false"
      >
        <FontAwesomeIcon icon="chevron-left" /> Prev State
      </button>

      <!-- :disabled is active when currentStateId is equal to 'clonedStates' array length,
        it means that changed state of note is the last state -->

      <!-- @blur event changes 'walkInTime' option, which helps app to 
        understand in which mode the note is -->
      <button
        :disabled="currentStateId + 1 === clonedStates.length"
        type="button"
        class="button"
        @click.prevent="nextStep"
        @blur="walkInTime = false"
      >
        Next State <FontAwesomeIcon icon="chevron-right" />
      </button>
    </div>

    <div class="d-flex">
      <input
        ref="noteTitle"
        class="note-title"
        type="text"
        v-model="note.title"
      />

      <RemoveButton
        class="ml-15"
        size="lg"
        @click.native="callModalRemoveNote"
      />
    </div>

    <div class="todos">
      <!-- Binding v-model through croppedTasks[key] made because vue -->
      <!-- doesn't allow binding directly to item when used v-for loop -->
      <TodoItem
        ref="todoItem"
        v-for="(item, i) in note.tasks"
        :key="i"
        v-model="note.tasks[i]"
        @delete="deleteTodo"
      />

      <AddButton class="w-100" @click.prevent.native="addTodo" />
    </div>

    <div v-if="changed" class="note-footer d-flex justify-center align-center">
      <button
        :disabled="note.title == null || !note.title.length"
        class="button save"
        type="submit"
      >
        Save changes
      </button>

      <!-- We hide 'Cancel changes' button when it's new note -->
      <button
        v-if="id != 'new'"
        @click.prevent="callModalCancel"
        class="button cancel"
      >
        Cancel changes
      </button>
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
    // get relevant note by passing id to getter
    stateNote() {
      return this.$store.getters.getNoteById(this.id);
    }
  },

  async created() {
    if (this.id != "new") {
      // If it is existing note in "Edit" mode we clone it from state to edit duplicate
      // and then save it if it needed
      this.note = this.cloneDeepObject(this.stateNote);
    } else {
      // If it is new note we set it new unique ID
      this.note.id = this.$store.getters.lastNoteId + 1;
    }
    // Clone started state of note into clonedStateds
    await this.$nextTick();

    // Reset fields to default settings after state change
    this.changed = false;
    // Clone started state of note into clonedStateds
    this.clonedStates = [this.cloneDeepObject(this.note)];
    this.currentStateId = 0;

    // By default we focus on title input for start editing
    this.$refs.noteTitle.focus();
  },

  data: () => ({
    note: {
      id: null,
      title: null,
      tasks: []
    },
    currentStateId: 0,
    clonedStates: [],
    walkInTime: false,

    changed: false
  }),

  methods: {
    // Created cloneDeepObject method for copying objects correctly
    // to avoid code cuplication
    cloneDeepObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    prevStep() {
      // Set 'on' mode of changing current step of note editing
      this.walkInTime = true;
      this.currentStateId -= 1;

      // Go to the previous step of note state version
      this.note = this.cloneDeepObject(this.clonedStates[this.currentStateId]);
    },

    nextStep() {
      // Set 'on' mode of changing current step of note editing
      this.walkInTime = true;
      this.currentStateId += 1;

      // Go to the next step of note state version
      this.note = this.cloneDeepObject(this.clonedStates[this.currentStateId]);
    },

    saveChanges() {
      // Save state of note
      this.$store.commit("SAVE_NOTE", this.note);
      this.changed = false;

      // If it was 'new' note page, we turn to the page of this note
      if (this.id == "new") {
        this.$router.push(`/note/${this.note.id}`);
      }

      // Reset fields to default settings after page change
      this.walkInTime = false;
      this.clonedStates = [this.note];
      this.currentStateId = 0;
    },

    async cancelChanges() {
      // Reset fields to default
      this.note = JSON.parse(JSON.stringify(this.stateNote));

      await this.$nextTick();

      this.changed = false;
      this.walkInTime = false;
      this.clonedStates = [this.note];
      this.currentStateId = 0;
    },

    removeNote() {
      // When we want to delete note at first we must go to front
      // page for preventing an error, and then we call
      // 'REMOVE_NOTE' mutation which removes relevant note from state
      this.$router.push("/");
      this.$store.commit("REMOVE_NOTE", this.note.id);
    },

    callModalRemoveNote() {
      // Call modal show with passing of params to it
      this.$modal.show({
        title: `Are you sure want to remove "${this.note.title}" note?`,
        onSubmit: this.removeNote
      });
    },

    callModalCancel() {
      // Call modal show with passing of params to it
      this.$modal.show({
        title: "Are you sure want to cancel changes?",
        onSubmit: this.cancelChanges
      });
    },

    async addTodo() {
      if (this.note.tasks.length) {
        // Add new to-do item to state with new id if
        const id = this.note.tasks[this.note.tasks.length - 1].id + 1;
        this.note.tasks.push({ id, title: "", value: "" });
      } else {
        this.note.tasks.push({ id: 0, title: "", value: "" });
      }

      await this.$nextTick();

      this.$refs.todoItem[
        this.$refs.todoItem.length - 1
      ].$refs.todoText.focus();
    },

    deleteTodo(id) {
      const index = this.note.tasks.findIndex(task => task.id === id);
      this.note.tasks.splice(index, 1);
    }
  },

  watch: {
    note: {
      handler(newVal, oldVal) {
        if (oldVal.id != null) {
          this.changed = true;

          if (!this.walkInTime) {
            if (this.currentStateId + 1 < this.clonedStates.length) {
              this.clonedStates = this.clonedStates.slice(
                0,
                this.currentStateId + 1
              );
            }

            this.clonedStates.push(this.cloneDeepObject(oldVal));
            this.currentStateId += 1;
          }
        }
      },
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
  outline: none;

  &:focus {
    border-bottom: 3px solid $blue;
  }
}

.note-footer {
  margin-top: 30px;
}

.state-change-buttons {
  margin-bottom: 30px;
}
</style>
