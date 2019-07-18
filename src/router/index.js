import Vue from 'vue'
import Router from 'vue-router'

import { routers } from './router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: routers
})

export default router
