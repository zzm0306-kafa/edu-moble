import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入lib-flexible
import 'amfe-flexible'
// 引入vant组件
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
