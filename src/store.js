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
  },
  mutations: {
    updateHeader(state, payload) {
      state.header = { ...state.header, ...payload }
    }
  },
  actions: {
    updateHeader({ state, commit }, payload) {
      commit('updateHeader', payload)
    }
  }
})
