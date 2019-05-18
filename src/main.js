import Vue from 'vue';
import App from './App.vue';
import InputGroupPlugin from './plugin.js';

Vue.use(InputGroupPlugin);

new Vue({
  render: h => h(App)
}).$mount('#app');
