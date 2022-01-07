<template>
  <div class="board">
    <v-dialog
      v-model="itemToDelete.name"
      persistent
      max-width="600"
      v-if="itemToDelete.name"
    >
      <v-card dark>
        <v-card-title>
          Are you sure you want to delete
          <b class="mx-2">{{ itemToDelete.name }}</b>
          {{ itemToDelete.columnOrTask }} ? </v-card-title
        ><v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="itemToDelete.name = ''">
            cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="confirmDeleting">
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-box">
      <div
        v-for="(col, colIndex) in board.columns"
        :key="colIndex"
        class="column"
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
      <div class="column">
        <v-text-field
          label="+ Enter a new column"
          dense
          solo
          v-model="newColumnName"
          @keyup.enter="addNewColumn"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapState(['board']),
  },

  data() {
    return {
      name: '',
      description: '',
      newColumnName: '',
      itemToDelete: {
        colIndex: null,
        name: '',
        columnOrTask: '',
        taskIndex: null,
      },
    }
  },

  methods: {
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

    selectedItem(colIndex, name, taskIndex) {
      this.itemToDelete = {
        name,
        colIndex,
        columnOrTask: taskIndex === null ? 'column' : 'task',
        taskIndex,
      }
    },

    confirmDeleting() {
      if (this.itemToDelete.columnOrTask === 'column') {
        this.$store.commit('DELETE_COLUMN', this.itemToDelete.colIndex)
      } else this.$store.commit('DELETE_TASK', this.itemToDelete)
      this.itemToDelete.name = ''
    },

    addNewColumn() {
      this.$store.commit('ADD_COLUMN', this.newColumnName)
      this.newColumnName = ''
    },

    toggleTaskDone(task) {
      this.$store.commit('CHANGE_TASK_DONE', {
        task,
        taskDoneValue: task.done,
      })
    },
  },
}
</script>

<style scoped>
.board {
  background: url('../assets/trello-image2.png') no-repeat;
  overflow: auto;
  background-size: cover;
  height: 100%;
  padding: 10px;
}

.flex-box {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}

.column {
  margin-right: 20px;
  background-color: #dae1e7;
  padding: 0.5rem;
  margin-right: 1rem;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  border-radius: 0.25rem;
  min-width: 350px;
}

.list-reset {
  list-style: none;
  padding: 0;
}

.itemToDelete {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
}

.broom-font {
  font-size: 18px !important;
  cursor: pointer;
}

.item-icon {
  position: absolute;
  right: 0;
}
</style>
