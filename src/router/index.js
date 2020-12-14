import Vue from 'vue'
import Router from 'vue-router'

import base from './modules/base'
import login from './modules/login'

Vue.use(Router)
let routes = [...base,...login];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
