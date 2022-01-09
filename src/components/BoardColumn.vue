<template>
  <div
    class="column"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event)"
    @drop="moveTaskOrColumn($event)"
  >
    <div class="mb-2 font-weight-bold d-flex justify-space-between">
      <span>{{ col.name }}</span>
      <v-icon right class="pointer" @click="selectColumnToDelete"
        >mdi-delete</v-icon
      >
    </div>
    <TaskColumn
      v-for="(task, taskIndex) of col.tasks"
      :key="taskIndex"
      :task="task"
      :taskIndex="taskIndex"
      :colIndex="colIndex"
    />
    <NewTask :colIndex="colIndex" />
  </div>
</template>

<script>
import TaskColumn from '@/components/TaskColumn.vue'
import NewTask from '@/components/NewTask.vue'

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

  components: {
    TaskColumn,
    NewTask,
  },

  methods: {
    pickupColumn(e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', this.colIndex)
      e.dataTransfer.setData('type', 'moveColumn')
    },

    moveTaskOrColumn(e) {
      const type = e.dataTransfer.getData('type')
      if (type === 'moveTask') this.moveTask(e, this.colIndex)
      else this.moveColumn(e, this.colIndex)
    },

    selectColumnToDelete() {
      this.$store.commit('SWITCH_ITEM_TO_DELETE', {
        name: this.col.name,
        colIndex: this.colIndex,
        columnOrTask: 'column',
        taskIndex: 0,
      })
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
