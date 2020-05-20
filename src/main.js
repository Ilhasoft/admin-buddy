import Vue from 'vue'
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';

import AdminBuddy, { initVeeValidate } from './plugin';
import App from './App.vue'

Vue.use(Buefy);
Vue.use(AdminBuddy);
Vue.use(VueAxios, axios);


Vue.config.productionTip = false;

initVeeValidate();

new Vue({
  render: h => h(App),
}).$mount('#app');

