import {
  get,
  post,
  END_POINTS
} from '@/api'

import { sleep } from '@/utils'

const baseUrl = process.env.VUE_APP_BASE_URL

const state = {
  userName: '',
  showImg: false,
  isLoggedin: false,
  refresh: false,
  imgSrc: '',
  msgCount: 0
}

const getters = {
  isLoggedin: (state) => {
    return localStorage.getItem('token') || state.isLoggedin
  }
}

const actions = {
  async login({
    commit,
    state,
    dispatch
  }, postData) {
    const responseData = await post(END_POINTS.LOGIN, postData)
    if (responseData.success) {
      commit('updateShowImg', false)
      commit('setLoginUser', {
        ...responseData.data
      })
    } else {
      if (postData.username) {
        dispatch('checkIsUseCaptchaLogin', postData)
      }
    }

    return responseData
  },
  async init({commit}) {
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
  async checkLoginStatus({
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
  async checkIsUseCaptchaLogin({
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
  async getCaptchaImg({
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
  initUser(state) {
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

  setLoginUser(state, {
    userName,
    token,
    defaultAreaCode,
    role,
    email,
    mobile,
    photo
  }) {
    localStorage.setItem('token', token)
    localStorage.setItem('userName', userName)
    localStorage.setItem('defaultAreaCode', defaultAreaCode)
    localStorage.setItem('email', email)
    localStorage.setItem('mobile', mobile)
    localStorage.setItem('photo', photo)
    if (role === 'dm_company') {
      localStorage.setItem('role', 'dm_company')
    } else localStorage.setItem('role', '')

    state.userName = userName
    state.isLoggedin = true
  },

  logout(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('mobile')
    localStorage.removeItem('photo')

    state.userName = ''
    state.isLoggedin = false
  },
  updateShowImg(state, showImg) {
    state.showImg = showImg
  },
  updateImgSrc(state, imgSrc) {
    state.imgSrc = imgSrc
  },
  updateRefresh(state, flag) {
    state.refresh = flag
  },
  updateMsgCount(state) {
    if (localStorage.getItem('meMessageQueue')) {
      let object = JSON.parse(localStorage.getItem('meMessageQueue'))
      state.msgCount = object.length
    } else {
      state.msgCount = 0
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
