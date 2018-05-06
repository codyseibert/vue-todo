<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>{{title}}</h1>
        <v-text-field
          label="Email"
          :value="email"
          @input="$emit('onEmailInput', $event)"
          placeholder="Email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          autocomplete="new-password"
          :value="password"
          @input="$emit('onPasswordInput', $event)"
          placeholder="Password"
        ></v-text-field>
        <v-btn @click="$emit('onAction')" color="green" dark>
          <v-icon>{{icon}}</v-icon>
          <span class="ml-2">{{action}}</span>
        </v-btn>
        <v-alert class="mt-4" type="error" :value="error">
          {{error}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'email',
    'password',
    'error',
    'title',
    'action',
    'icon',
  ],

};
</script>

<style>

</style>
