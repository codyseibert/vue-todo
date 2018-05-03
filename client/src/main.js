import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';

import App from './App.vue';
import router from './router';
import store from './store/';
import Panel from './components/Panel.vue';
import Confirm from './components/Confirm.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);

sync(store, router);

Vue.component('Panel', Panel);
Vue.component('Confirm', Confirm);

new Vue({
  router,
  store,
  render: (h) => {
    return h(App);
  },
}).$mount('#app');
