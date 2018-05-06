import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    entities: [],
    description: null,
    isConfirmDisplayed: false,
    taskToDeleteId: null,
  },
  actions: {
    fetchTasks({ commit, rootState }) {
      return HTTP().get(`projects/${rootState.projects.selectedProjectId}/tasks`)
        .then(({ data }) => {
          commit('setTasks', data);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    updateTask({ commit }, task) {
      return HTTP().patch(`tasks/${task.id}`, task)
        .then(() => {
          commit('setTaskEditMode', {
            task,
            isEdit: false,
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    createTask({ commit, state, rootState }) {
      return HTTP().post(`projects/${rootState.projects.selectedProjectId}/tasks`, {
        description: state.description,
      })
        .then(({ data }) => {
          commit('addTask', data);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    deleteSelectedTask({ state, commit }) {
      return HTTP().delete(`tasks/${state.taskToDeleteId}`)
        .then(() => {
          commit('deleteTask', state.taskToDeleteId);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },
  getters: {
    selectedTask(state) {
      return state.entities.find((task) => {
        return task.id === state.taskToDeleteId;
      }) || {};
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.entities = tasks;
    },
    toggleCompleted(state, task) {
      Vue.set(task, 'completed', !task.completed);
    },
    addTask(state, task) {
      state.entities.push(task);
    },
    setTaskEditMode(state, { task, isEdit }) {
      Vue.set(task, 'isEdit', isEdit);
    },
    deleteTask(state, taskId) {
      state.entities.splice(
        state.entities.findIndex((task) => task.id === taskId),
        1,
      );
    },
    setTaskToDeleteId(state, taskToDeleteId) {
      state.taskToDeleteId = taskToDeleteId;
    },
    setDescription(state, description) {
      state.description = description;
    },
    setTaskDescription(state, { task, description }) {
      task.description = description;
    },
    setConfirmDisplayed(state, isConfirmDisplayed) {
      state.isConfirmDisplayed = isConfirmDisplayed;
    },
  },
};
