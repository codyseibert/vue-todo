<template>
  <CredentialsForm
    title="login"
    icon="fingerprint"
    action="Login"
    :email="email"
    :password="password"
    :error="loginError"
    @onEmailInput="setEmail"
    @onPasswordInput="setPassword"
    @onAction="login"
  >
  </CredentialsForm>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CredentialsForm from '@/components/CredentialsForm.vue';

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
  components: {
    CredentialsForm,
  },
};
</script>

<style scoped>
</style>
