<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Login</h1>
        <v-text-field
          label="Email"
          :value="email"
          @input="setEmail"
          placeholder="Email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          autocomplete="new-password"
          :value="password"
          @input="setPassword"
          placeholder="Password"
        ></v-text-field>
        <v-btn @click="login" color="green" dark>
          <v-icon>fingerprint</v-icon>
          <span class="ml-2">Login</span>
        </v-btn>
        <v-alert class="mt-4" type="error" :value="loginError">
          {{loginError}}
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
      'email',
      'password',
      'loginError',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setEmail',
      'setPassword',
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  },
};
</script>

<style scoped>
</style>
