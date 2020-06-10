import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';

import AdminBuddy, { initVeeValidate } from './plugin';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(AdminBuddy);
Vue.use(VueAxios, axios);
Vue.use(CKEditor);


Vue.config.productionTip = false;

initVeeValidate();

new Vue({
  render: (h) => h(App),
  router: new VueRouter({
    routes: [],
  }),
}).$mount('#app');


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // eslint-disable-next-line
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
