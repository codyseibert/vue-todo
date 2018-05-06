<template>
  <v-layout row wrap class="mt-4">
    <v-flex xs8 class="pt-2">
      <v-text-field
        @input="$emit('onInput', $event)"
        hide-details
        :placeholder="placeholder"
        @keyup.enter="$emit('onCreate')"
        :value="value"
      >
      </v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-btn
        @click="$emit('onCreate')"
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
};
</script>

<style scoped>
.input-group {
  padding: 0px;
}
</style>
