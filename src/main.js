import Vue from 'vue'
import VueAMap from 'vue-amap'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from './i18n'
import './custom'
import 'iview/dist/styles/iview.css'
import './theme/index.less'
import PairIcon from './icons'

Vue.use(PairIcon)
Vue.use(VueAMap)
Vue.use(iView)

Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: '7bfb1994e208f200c2cd63a626f74868',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Heatmap',
    'AMap.MouseTool'
  ],
  v: '1.4.10',
  uiVersion: '1.0.11'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
