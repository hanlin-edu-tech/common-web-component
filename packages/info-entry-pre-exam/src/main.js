import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ehanlin-basicss/src/css/all.css'
import { util } from './modules/util'

util.registerArrayLast()
util.registerObjArrayGroupBy()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
