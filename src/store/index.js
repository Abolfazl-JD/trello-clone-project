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
  },

  mutations: {
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
  },

  actions: {},
  modules: {},
})
