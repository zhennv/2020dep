import Login from '../views/login/index.vue';

export default [
  {
    name: "Login",
    path: "/login",
    component: () => import(/*webpackChunkName:"about" */'../views/modules/login/index.vue')
  }
]