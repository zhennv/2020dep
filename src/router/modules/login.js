import Login from '@/views/modules/login/index';

export default [
  {
    name: "Login",
    path: "/login",
    component: () => import(/*webpackChunkName:"about" */'../../views/modules/login/index.vue')
  }
]