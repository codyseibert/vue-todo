<template>
  <v-dialog :value="isVisible" max-width="500px">
    <v-card>
      <v-card-title>
        <h1>Delete Confirmation</h1>
        <p>Are you sure you want to delete "{{name}}"?</p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCancel" color="primary" flat>Cancel</v-btn>
        <v-btn @click="onConfirm" color="error" flat>Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'isVisible',
    'name',
  ],
  methods: {
    onCancel() {
      this.$emit('onCancel');
    },
    onConfirm() {
      this.$emit('onConfirm');
    },
  },
};
</script>

<style>

</style>
