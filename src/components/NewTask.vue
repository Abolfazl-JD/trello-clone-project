<template>
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
          <v-btn color="primary" @click="addNewTask(dialog)">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    colIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      name: '',
      description: '',
    }
  },

  methods: {
    addNewTask(dialog) {
      this.$store.commit('CREATE_NEW_TASK', {
        colIndex: this.colIndex,
        name: this.name,
        description: this.description,
      })
      dialog.value = false
      this.name = ''
      this.description = ''
    },
  },
}
</script>
