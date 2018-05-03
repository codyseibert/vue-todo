<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Registration</h1>
        <v-text-field
          label="Email"
          :value="registrationEmail"
          @input="setRegistrationEmail"
          placeholder="Email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          autocomplete="new-password"
          :value="registrationPassword"
          @input="setRegistrationPassword"
          placeholder="Password"
        ></v-text-field>
        <v-btn @click="register" color="green" dark>
          <v-icon>account_circle</v-icon>
          <span class="ml-2">Register</span>
        </v-btn>
        <v-alert class="mt-4" type="error" :value="registrationError">
          {{registrationError}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState('authentication', [
      'registrationError',
      'registrationPassword',
      'registrationEmail',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegistrationEmail',
      'setRegistrationPassword',
    ]),
    ...mapActions('authentication', [
      'register',
    ]),
  },
};
</script>

<style scoped>
</style>
