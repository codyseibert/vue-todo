import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    email: null,
    password: null,
    registrationEmail: null,
    registrationPassword: null,
    loginError: null,
    registrationError: null,
    token: null,
  },
  actions: {
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('/auth/login', {
        email: state.email,
        password: state.password,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          commit('tasks/setTasks', [], { root: true });
          commit('projects/setSelectedProjectId', null, { root: true });
          router.push('/');
        })
        .catch(() => {
          commit('setLoginError', 'Invalid login information');
        });
    },
    register({ commit, state }) {
      commit('setRegistrationError', null);
      return HTTP().post('/auth/register', {
        email: state.registrationEmail,
        password: state.registrationPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          commit('tasks/setTasks', [], { root: true });
          commit('projects/setSelectedProjectId', null, { root: true });
          router.push('/');
        })
        .catch(() => {
          commit('setRegistrationError', 'An error has occurred trying to create your account.');
        });
    },
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoginError(state, err) {
      state.loginError = err;
    },
    setRegistrationError(state, err) {
      state.registrationError = err;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setRegistrationEmail(state, email) {
      state.registrationEmail = email;
    },
    setRegistrationPassword(state, password) {
      state.registrationPassword = password;
    },
  },
};
