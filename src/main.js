import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './iView'
import i18n from './i18n'
import './custom'
import './theme/index.less'
import PairIcon from './icons'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(PairIcon)

Vue.config.productionTip = false

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
