import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户信息
    user: JSON.parse(window.localStorage.getItem('lagouedu-mobile-user') || null)
  },
  getters: {
  },
  mutations: {
    // 修改用户存储信息
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      //  将数据设置到本地存储，注意本地存储无法存储对象
      window.localStorage.setItem('lagouedu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
