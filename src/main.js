import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import user from './services/user-service'

Vue.config.productionTip = false;

Vue.use(user);

new Vue({
  render: h => h(App)
}).$mount('#app');