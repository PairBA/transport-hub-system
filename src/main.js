import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from './i18n'
import 'iview/dist/styles/iview.css'
import PairIcon from './icons'
Vue.use(PairIcon)

Vue.use(iView)

Vue.config.productionTip = false
const localLang = localStorage.getItem('trans-language')
// 如果本地没有设置语言则使用默认值，设置过则无需重新设置
if (!localLang) {
  localStorage.setItem('trans-language', localLang)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
