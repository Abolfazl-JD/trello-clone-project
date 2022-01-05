<template>
  <div class="board">
    <div class="flex-box" v-if="columns">
      <div v-for="(col, colIndex) in columns" :key="colIndex" class="column">
        <div class="mb-2 font-weight-bold">{{ col.name }}</div>
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
                <v-checkbox v-model="task.done" color="primary"></v-checkbox>
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
            </v-list-item>
          </div>
        </div>

        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary my-2" v-bind="attrs" v-on="on">
              <v-icon left>mdi-plus</v-icon>
              create new task
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
                  maxlength="35"
                  clearable
                  rows="4"
                  row-height="30"
                  outlined
                ></v-textarea>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="primary" @click="dialog.value = false"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapState(['columns']),
  },

  data() {
    return {
      name: '',
    }
  },

  mounted() {
    this.$store.dispatch('getColumns')
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
</style>
