<template>
  <div class="board">
    <DeleteAlert v-if="itemToDelete.name" />
    <div class="flex-box">
      <BoardColumn
        v-for="(col, colIndex) in board.columns"
        :key="colIndex"
        :col="col"
        :colIndex="colIndex"
      />
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
import DeleteAlert from '@/components/DeleteAlert.vue'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  name: 'Home',

  components: {
    DeleteAlert,
    BoardColumn,
  },

  computed: {
    ...mapState(['board', 'itemToDelete']),
  },

  data() {
    return {
      newColumnName: '',
    }
  },

  methods: {
    addNewColumn() {
      this.$store.commit('ADD_COLUMN', this.newColumnName)
      this.newColumnName = ''
    },
  },
}
</script>

<style>
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

.item-icon {
  position: absolute;
  right: 0;
}
</style>
