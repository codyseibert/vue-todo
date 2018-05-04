import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import projects from './projects';
import tasks from './tasks';
import authentication from './authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseApiUrl: '/api',
  },
  modules: {
    projects,
    tasks,
    authentication,
  },
  plugins: [createPersistedState()],
});
