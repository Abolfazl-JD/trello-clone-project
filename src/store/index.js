import Vue from 'vue'
import Vuex from 'vuex'
import EventHandler from '../services/EventHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    columns: [],
  },
  mutations: {
    ADD_COLUMNS(state, columns) {
      state.columns = columns
    },
  },
  actions: {
    getColumns({ commit }) {
      EventHandler.API_get()
        .then((res) => {
          commit('ADD_COLUMNS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  modules: {},
})
