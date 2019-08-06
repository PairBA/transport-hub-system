import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import { routers } from './router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: routers
})

router.beforeEach((to, from, next) => {
  // 如果去登录页,则直接跳登录页
  if (to.name === '登录') next()
  else if (store.getters['login/isLoggedin']) {
    if (!store.state.permission.hasGetRules) {
      // 验证token是否有效
      store.dispatch('login/init').then(result => {
        console.log(result)
        if (result) {
          store.dispatch('permission/getResourceListByRole').then(() => {
            const homePage = store.state.permission.homePage
            console.log(homePage)
            // 判断是否输入空地址，若为空且已经登录则跳转首页
            if (to.path === '/') {
              next({ path: homePage, replace: true })
            } else next({ ...to, replace: true })
          }).catch(() => {
            next({ name: '登录' })
          })
        } else next({ name: '登录' })
      })
    } else {
      if (to.name === '登录') store.commit('permission/updateHasRule', false)
      next()
    }
  } else next({ name: '登录' })
})

export default router
