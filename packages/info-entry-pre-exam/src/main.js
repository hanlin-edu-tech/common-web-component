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

Vue.prototype.$ehanlinComponentLoader = () => {
  let scriptElement, embeddedScript, componentTargets
  scriptElement = document.getElementById('ehanlin-loader-js')
  if(scriptElement) {
    scriptElement.parentNode.removeChild(scriptElement)
  }
  componentTargets = document.querySelectorAll('#ehanlin-header, #ehanlin-menu, #info-left-side, #ehanlin-footer');
  componentTargets.forEach(componentTarget => {
    componentTarget.innerHTML = ''
  })

  embeddedScript = document.createElement('script')
  embeddedScript.setAttribute('id', 'ehanlin-loader-js')
  embeddedScript.setAttribute('src',
    '//s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/js/ehanlin-loader.js')
  embeddedScript.setAttribute('data-module', 'ehanlin-header, ehanlin-menu, ehanlin-info-left-side, ehanlin-footer')
  document.head.appendChild(embeddedScript)
}

new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
