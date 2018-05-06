import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    entities: [],
    title: null,
    isCreateProjectError: false,
    isConfirmDisplayed: false,
    deleteProjectError: false,
    selectedProjectId: null,
    projectToDeleteId: null,
  },
  actions: {
    fetchProjects({ commit }) {
      return HTTP().get('projects')
        .then(({ data }) => {
          commit('setProjects', data);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    updateProject({ commit }, project) {
      return HTTP().patch(`projects/${project.id}`, project)
        .then(() => {
          commit('setProjectEditMode', {
            project,
            isEdit: false,
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    deleteProject({ commit, state }) {
      return HTTP().delete(`projects/${state.projectToDeleteId}`)
        .then(() => {
          commit('deleteProject', state.projectToDeleteId);
        })
        .catch(() => {
          commit('setDeleteProjectError', true);
        });
    },
    createProject({ commit, state }) {
      commit('setCreateProjectError', false);
      return HTTP().post('projects', {
        title: state.title,
      })
        .then(({ data }) => {
          commit('addProject', data);
        })
        .catch(() => {
          commit('setCreateProjectError', true);
        });
    },
    selectFirstProject({ dispatch, commit, state }) {
      commit('selectFirstProject');
      if (state.selectedProjectId) {
        dispatch('tasks/fetchTasks', null, { root: true });
      }
    },
  },
  getters: {
    selectedProject(state) {
      return state.entities.find((project) => {
        return project.id === state.selectedProjectId;
      });
    },
    projectToDelete(state) {
      return state.entities.find((project) => {
        return project.id === state.projectToDeleteId;
      }) || {};
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.entities = projects;
    },
    setTitle(state, title) {
      state.title = title;
    },
    selectFirstProject(state) {
      if (state.entities.length > 0) {
        state.selectedProjectId = state.entities[0].id;
      } else {
        state.selectedProjectId = null;
      }
    },
    addProject(state, project) {
      state.entities.push(project);
    },
    setProjectTitle(state, { project, title }) {
      project.title = title;
    },
    setProjectEditMode(state, { project, isEdit }) {
      Vue.set(project, 'isEdit', isEdit);
    },
    setCreateProjectError(state, isCreateProjectError) {
      state.isCreateProjectError = isCreateProjectError;
    },
    setConfirmDisplayed(state, isConfirmDisplayed) {
      state.isConfirmDisplayed = isConfirmDisplayed;
    },
    setDeleteProjectError(state, deleteProjectError) {
      state.deleteProjectError = deleteProjectError;
    },
    setProjectToDelete(state, projectToDeleteId) {
      state.projectToDeleteId = projectToDeleteId;
    },
    deleteProject(state, projectToDeleteId) {
      state.entities.splice(
        state.entities.findIndex((project) => project.id === projectToDeleteId),
        1,
      );
    },
    setSelectedProjectId(state, selectedProjectId) {
      state.selectedProjectId = selectedProjectId;
    },
  },
};
