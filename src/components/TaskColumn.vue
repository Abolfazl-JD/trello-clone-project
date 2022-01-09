<template>
  <div draggable @dragstart="pickupTask($event)" class="list-reset">
    <div class="rounded mb-2 white grey--text text--darken-2 font-weight-bold">
      <v-list-item>
        <v-list-item-action class="mr-4 mb-4">
          <v-checkbox
            @change="toggleTaskDone"
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
          <v-icon @click="selectTaskToDelete" color="primary" class="broom-font"
            >mdi-broom</v-icon
          >
        </v-list-item-icon>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    colIndex: {
      type: Number,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },

  methods: {
    pickupTask(e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('task-index', this.taskIndex)
      e.dataTransfer.setData('from-column-index', this.colIndex)
      e.dataTransfer.setData('type', 'moveTask')
    },

    toggleTaskDone() {
      this.$store.commit('CHANGE_TASK_DONE', {
        task: this.task,
        taskDoneValue: this.task.done,
      })
    },

    selectTaskToDelete() {
      this.$store.commit('SWITCH_ITEM_TO_DELETE', {
        name: this.task.name,
        colIndex: this.colIndex,
        columnOrTask: 'task',
        taskIndex: this.taskIndex,
      })
    },
  },
}
</script>

<style lang="css" scoped>
.list-reset {
  list-style: none;
  padding: 0;
}

.broom-font {
  font-size: 18px !important;
  cursor: pointer;
}
</style>
