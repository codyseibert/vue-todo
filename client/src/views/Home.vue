<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs4>
        <Projects></Projects>
      </v-flex>
      <v-flex xs8 class="pl-4">
        <Tasks v-if="selectedProjectId"></Tasks>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Projects from '@/components/Projects.vue';
import Tasks from '@/components/Tasks.vue';
import router from '../router';

export default {
  name: 'home',
  components: {
    Projects,
    Tasks,
  },
  mounted() {
    if (!this.token) {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('authentication', [
      'token',
    ]),
    ...mapState('projects', [
      'selectedProjectId',
    ]),
  },
};
</script>
