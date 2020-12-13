import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import '@/assets/styles/reset.less'
import '@/assets/styles/login.less'
import '@/assets/styles/register.less'
import '@/assets/styles/layout.less'

import axios from './providers/axios.js'
import api from './providers/api.js'
import components from './components/index.js'
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Object.keys(components).forEach(item => {
  Vue.component(item, components[item]);
})
router.beforeEach((to, from, next) => {
  console.log(to, from);
  next()
  // next(vm => {
  //   console.log(vm);
  // })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
