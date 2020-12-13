import Vue from 'vue'
import Router from 'vue-router'

import base from './modules/base'

Vue.use(Router)
let routes = [...base];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
