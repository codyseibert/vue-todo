<template>
  <CredentialsForm
    title="Registration"
    icon="account_circle"
    action="Register"
    :email="registrationEmail"
    :password="registrationPassword"
    :error="registrationError"
    @onEmailInput="setRegistrationEmail"
    @onPasswordInput="setRegistrationPassword"
    @onAction="register"
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
  components: {
    CredentialsForm,
  },
};
</script>

<style scoped>
</style>
