import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ehanlin-basicss/src/css/all.css'
import axiosConfig from './modules/axios-config'
import { util } from './modules/util'

util.registerArrayFirst()
util.registerArrayLast()
util.registerObjArrayGroupBy()

Vue.config.productionTip = false
Vue.use(axiosConfig)

Vue.prototype.$delay = millisecond => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
}

new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
