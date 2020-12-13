import Home from '../../views/modules/home/index.vue'
export default [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/modules/about/index.vue')
  },
  {
    path: '/photo/grapher',
    name: 'grapher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/modules/photo/index.vue')
  },
]