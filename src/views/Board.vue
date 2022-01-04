<template>
  <div class="board">
    <div class="flex-box">
      <div class="column">
        <div class="mb-2 font-weight-bold">todo</div>
        <div class="list-reset">
          <div
            class="rounded mb-2 pa-3 white grey--text text--darken-2 font-weight-bold"
          >
            task
          </div>
          <div
            class="rounded mb-2 pa-3 white grey--text text--darken-2 font-weight-bold"
          >
            task
          </div>
          <div
            class="rounded mb-2 pa-3 white grey--text text--darken-2 font-weight-bold"
          >
            task
          </div>
        </div>
        <v-text-field
          outlined
          dense
          counter
          placeholder="+ Enter new task"
          required
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},
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
