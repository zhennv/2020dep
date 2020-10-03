import Vue from 'vue'
import Router from 'vue-router'

import base from './router/base'
import qestions from './router/qestions'
import ship from './router/ship'

Vue.use(Router)
let routes = [...base, ...qestions, ...ship];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
