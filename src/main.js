import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './iView'
import i18n from './i18n'
import './custom'
import './theme/index.less'
import PairIcon from './icons'

Vue.use(PairIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
