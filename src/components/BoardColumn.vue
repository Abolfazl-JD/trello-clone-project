<template>
  <div
    class="column"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, colIndex)"
    @drop="moveTaskOrColumn($event, colIndex)"
  >
    <div class="mb-2 font-weight-bold d-flex justify-space-between">
      <span>{{ col.name }}</span>
      <v-icon
        right
        class="pointer"
        @click="selectedItem(colIndex, col.name, null)"
        >mdi-delete</v-icon
      >
    </div>
    <div
      v-for="(task, taskIndex) of col.tasks"
      :key="taskIndex"
      draggable
      @dragstart="pickupTask($event, taskIndex, colIndex)"
      class="list-reset"
    >
      <div
        class="rounded mb-2 white grey--text text--darken-2 font-weight-bold"
      >
        <v-list-item>
          <v-list-item-action class="mr-4 mb-4">
            <v-checkbox
              @change="toggleTaskDone(task)"
              color="primary"
              v-model="task.done"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              :class="{
                'text-decoration-line-through grey--text': task.done,
              }"
            >
              {{ task.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="font-italic caption">
              {{ task.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon class="item-icon">
            <v-icon
              @click="selectedItem(colIndex, task.name, taskIndex)"
              color="primary"
              class="broom-font"
              >mdi-broom</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </div>
    </div>

    <v-dialog max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="primary my-2" small v-bind="attrs" v-on="on">
          <v-icon left>mdi-plus</v-icon>
          New task
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="text-center justify-center mb-7">
            <h4>Create a new task</h4>
          </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              v-model="name"
              counter
              label="Task to do"
            ></v-text-field>
            <v-textarea
              label="Add description"
              counter
              v-model="description"
              maxlength="35"
              clearable
              rows="4"
              row-height="30"
              outlined
            ></v-textarea>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="addNewTask(dialog, colIndex)"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    col: {
      type: Object,
      required: true,
    },
    colIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      name: '',
      description: '',
    }
  },

  methods: {
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'moveColumn')
    },

    moveTaskOrColumn(e, toColumnIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'moveTask') this.moveTask(e, toColumnIndex)
      else this.moveColumn(e, toColumnIndex)
    },

    selectedItem(colIndex, name, taskIndex) {
      this.$store.commit('SWITCH_ITEM_TO_DELETE', {
        name,
        colIndex,
        columnOrTask: taskIndex === null ? 'column' : 'task',
        taskIndex,
      })
    },

    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'moveTask')
    },

    toggleTaskDone(task) {
      this.$store.commit('CHANGE_TASK_DONE', {
        task,
        taskDoneValue: task.done,
      })
    },

    addNewTask(dialog, colIndex) {
      this.$store.commit('CREATE_NEW_TASK', {
        colIndex,
        name: this.name,
        description: this.description,
      })
      dialog.value = false
      this.name = ''
      this.description = ''
    },

    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      })
    },

    moveTask(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const taskIndex = e.dataTransfer.getData('task-index')

      this.$store.commit('MOVE_TASK', {
        fromColumnIndex,
        toColumnIndex,
        taskIndex,
      })
    },
  },
}
</script>

<style scoped>
.list-reset {
  list-style: none;
  padding: 0;
}

.broom-font {
  font-size: 18px !important;
  cursor: pointer;
}
</style>
