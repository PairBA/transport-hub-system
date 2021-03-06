import {
  get,
  post,
  deleteSend,
  END_POINTS
} from '@/api'

import { sleep } from '@/utils'

const state = {
  userName: '',
  isLoggedin: false,
  msgCount: 0
}

const getters = {
  isLoggedin: (state) => {
    return localStorage.getItem('hub-token') || state.isLoggedin
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
      commit('setLoginUser', {
        ...responseData.data
      })
    }
    return responseData
  },
  async logout() {
    return deleteSend(END_POINTS.LOGOUT)
  },
  async init({ commit }) {
    const responseData = await get(END_POINTS.TOKEN_EXPIRE)

    let isLoggedin

    if (responseData.success) {
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
      responseData = await get(END_POINTS.TOKEN_EXPIRE)
    } while (responseData.success)
    commit('logout')
  }
}

const mutations = {
  setLoginUser(state, {
    userName,
    userId,
    token,
    areaCode,
    configId,
    hubCodeAndNameList,
    systemName,
    roleId,
    terminalCode
  }) {
    localStorage.setItem('hub-token', token)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userId', userId)
    localStorage.setItem('areaCode', areaCode)
    localStorage.setItem('configId', configId)
    localStorage.setItem('hubCodeAndNameList', hubCodeAndNameList.join(';'))
    localStorage.setItem('systemName', systemName)
    localStorage.setItem('roleId', roleId)
    localStorage.setItem('hub-terminalCode', terminalCode || '')

    state.userName = userName
    state.isLoggedin = true
  },

  logout(state) {
    localStorage.removeItem('hub-token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('mobile')
    localStorage.removeItem('photo')
    localStorage.removeItem('hub-terminalCode')

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
