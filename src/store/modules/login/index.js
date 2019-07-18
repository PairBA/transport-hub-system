import {
  get,
  post,
  END_POINTS
} from '@/api'

import { sleep } from '@/utils'

const baseUrl = process.env.VUE_APP_BASE_URL

const state = {
  userName: '',
  isLoggedin: false,
  msgCount: 0
}

const getters = {
  isLoggedin: (state) => {
    return localStorage.getItem('token') || state.isLoggedin
  }
}

const actions = {
  async login ({
    commit,
    state,
    dispatch
  }, postData) {
    const responseData = await post(END_POINTS.LOGIN, postData)
    if (responseData.success) {
      commit('setLoginUser', {
        ...responseData.data
      })
    }
    return responseData
  },
  async init ({ commit }) {
    const token = localStorage.getItem('token')
    const responseData = await get(END_POINTS.TOKEN_EXPIRE, token)

    let isLoggedin

    if (responseData.success) {
      commit('initUser')
      isLoggedin = true
    } else {
      commit('logout')

      isLoggedin = false
    }

    return isLoggedin
  },
  async checkLoginStatus ({
    state,
    commit
  }) {
    let responseData
    do {
      await sleep(1000 * 60)
      responseData = await get(END_POINTS.TOKEN_EXPIRE, localStorage.getItem('token'))
    } while (responseData.success)
    commit('logout')
  },
  async checkIsUseCaptchaLogin ({
    state,
    dispatch,
    commit
  }, postData) {
    const responseData = await get(END_POINTS.CAPTCHA + `?action=display&id=${postData.username}`, '')
    if (responseData.data) {
      commit('updateShowImg', true)
      dispatch('getCaptchaImg', postData)
    }
  },
  async getCaptchaImg ({
    state,
    dispatch,
    commit
  }, postData) {
    let rnd = ''
    for (let i = 0; i < 5; i++) {
      rnd += Math.floor(Math.random() * 10)
    }
    commit('updateImgSrc', `${baseUrl}${END_POINTS.CAPTCHA}?action=create&id=${postData.username}&random=${rnd}`)
  }
}

const mutations = {
  initUser (state) {
    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    if (token && userName) {
      state.userName = userName
      state.isLoggedin = true
    } else {
      state.userName = ''
      state.isLoggedin = false
    }
  },

  setLoginUser (state, {
    userName,
    userId,
    token,
    areaCode,
    hubCode,
    roleName,
    hubName,
    systemName
  }) {
    localStorage.setItem('token', token)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userId', userId)
    localStorage.setItem('areaCode', areaCode)
    localStorage.setItem('hubCode', hubCode)
    localStorage.setItem('hubName', hubName)
    localStorage.setItem('systemName', systemName)

    state.userName = userName
    state.isLoggedin = true
  },

  logout (state) {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('mobile')
    localStorage.removeItem('photo')

    state.userName = ''
    state.isLoggedin = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
