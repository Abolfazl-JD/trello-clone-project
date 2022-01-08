<template>
  <v-dialog v-model="itemToDelete.name" persistent max-width="600">
    <v-card dark>
      <v-card-title>
        Are you sure you want to delete
        <b class="mx-2">{{ itemToDelete.name }}</b>
        {{ itemToDelete.columnOrTask }} ? </v-card-title
      ><v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="resetItemToDelete">
          cancel
        </v-btn>
        <v-btn color="red darken-1" text @click="confirmDeleting">
          delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['itemToDelete']),
  },

  methods: {
    resetItemToDelete() {
      this.$store.commit('SWITCH_ITEM_TO_DELETE', {
        name: '',
        colIndex: 0,
        columnOrTask: '',
        taskIndex: 0,
      })
    },

    confirmDeleting() {
      if (this.itemToDelete.columnOrTask === 'column') {
        this.$store.commit('DELETE_COLUMN', this.itemToDelete.colIndex)
      } else this.$store.commit('DELETE_TASK', this.itemToDelete)
      this.resetItemToDelete()
    },
  },
}
</script>

<style lang="scss" scoped></style>
