import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 全局样式
import './style/index.less'
// vant
import Vant from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible'
import store from '@/store'
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
