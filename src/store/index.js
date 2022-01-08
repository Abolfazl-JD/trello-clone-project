import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './defaultBoard'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
    itemToDelete: {
      colIndex: null,
      name: '',
      columnOrTask: '',
      taskIndex: null,
    },
  },

  mutations: {
    SWITCH_ITEM_TO_DELETE(state, val) {
      state.itemToDelete = val
    },

    CREATE_NEW_TASK(state, { colIndex, name, description }) {
      state.board.columns[colIndex].tasks.push({
        description,
        name,
        id: uuid(),
        done: false,
      })
    },

    DELETE_COLUMN(state, colIndex) {
      state.board.columns.splice(colIndex, 1)[0]
    },

    ADD_COLUMN(state, name) {
      state.board.columns.push({
        name,
        tasks: [],
      })
    },

    // eslint-disable-next-line no-unused-vars
    CHANGE_TASK_DONE(state, { task, taskDoneValue }) {
      task.done = taskDoneValue
    },

    DELETE_TASK(state, itemToDelete) {
      state.board.columns[itemToDelete.colIndex].tasks.splice(
        itemToDelete.taskIndex,
        1
      )[0]
    },

    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },

    MOVE_TASK(state, { fromColumnIndex, toColumnIndex, taskIndex }) {
      const taskToMove = state.board.columns[fromColumnIndex].tasks.splice(
        taskIndex,
        1
      )[0]
      state.board.columns[toColumnIndex].tasks.push(taskToMove)
    },
  },

  actions: {},
  modules: {},
})
