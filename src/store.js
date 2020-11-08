import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // wsPath: wsconPath[scene],
    userInfo: {},
    token: "",
    socket: "",
    chatBadgeNum: 0,//所有消息未读
    picConstParams: {},//登录以后可以获取到的所有参数
    needBottomBar: true,

    header: {
      title: '首页',
      leftIcon: 'icon-icon_return',
      rightIcon: 'icon-icon_return',
      rightClicked: false,
    },
    parameters: {},//保存页面传参
  },
  getters: {
    parameters: state => {
      if (JSON.stringify(state.parameters) === "{}") {//parameters是空对象时
        state.parameters = JSON.parse(sessionStorage.getItem("parameters"))
      }
      return state.parameters
    },
  },
  mutations: {
    updateHeader(state, payload) {
      state.header = { ...state.header, ...payload }
    },
    setParameters: (store, payload) => {//路由跳转时 每次更新本地存储的内容
      if (payload) {
        store.parameters = payload;
        sessionStorage.setItem("parameters", JSON.stringify(payload))
      }
    },
  },
  actions: {
    updateHeader({ state, commit }, payload) {
      commit('updateHeader', payload)
    }
  }
})
