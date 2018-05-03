<template>
  <v-layout row wrap class="mt-4">
    <v-flex xs8 class="pt-2">
      <v-text-field
        @input="onInput"
        hide-details
        :placeholder="placeholder"
        @keyup.enter="onCreate"
        :value="value"
      >
      </v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-btn
        @click="onCreate"
        :dark="!!value"
        :disabled="!value"
        color="green"
        class="mt-2"
      >
        <v-icon class="mr-2">add_circle</v-icon>
        Create
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'placeholder',
    'input',
    'value',
  ],
  methods: {
    onCreate() {
      this.$emit('onCreate');
    },
    onInput(text) {
      this.$emit('onInput', text);
    },
  },
};
</script>

<style scoped>
.input-group {
  padding: 0px;
}
</style>
