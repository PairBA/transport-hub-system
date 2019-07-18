import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from './i18n'
import 'iview/dist/styles/iview.css'
import './theme/index.less'
import PairIcon from './icons'
Vue.use(PairIcon)

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
