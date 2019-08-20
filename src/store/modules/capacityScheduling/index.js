import {
  END_POINTS,
  get
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  date: new Date(),
  notifyTarget: '',
  notifyType: '',
  notifyEnable: true,
  estCountArray: []
}
const actions = {
  async loadEstChartInScreen({
    commit,
    state,
    rootState
  }) {
    const notifycationData = await get(END_POINTS.GET_TRANSPORT_NOTIFY_CONFIG + `?areaCode=${rootState.areaCodeForSelect}&hubCode=${localStorage.getItem('hubCode')}`)
    if (notifycationData.code === 2001) {
      commit('updateNotifyTarget', notifycationData.data.notifyRange)
      commit('updateNotifyType', notifycationData.data.notifyType)
      commit('updateNotifyEnable', false)
      const responseData = await get(END_POINTS.GET_DYNAMIC_DATA + `?hubCode=${localStorage.getItem('hubCode')}&estDate=${dateFormat(state.date, 'yyyy-MM-dd')}`)
      if (responseData.code === 2001) {
        commit('updateEstChartInScreen', responseData.data)
      } else {
        commit('updateEstChartInScreen', [])
      }
    } else {
      commit('updateInvalidEstChart')
      commit('updateNotifyEnable', true)
    }
  },
  async updateHubNotifyConfig({
    commit,
    state
  }, notifyTarget) {
    const updateConfigObject = await get(END_POINTS.UPDATE_HUB_NOTIFY_CONFIG + `?hubCode=${localStorage.getItem('hubCode')}&notifyRange=${notifyTarget}`)
    if (updateConfigObject.success) {
      commit('updateNotifyTarget', notifyTarget)
      return updateConfigObject.success
    }
  },
  async updateHubNotifyType({
    commit,
    state
  }, notifyType) {
    const updateConfigObject = await get(END_POINTS.UPDATE_HUB_NOTIFY_TYPE + `?hubCode=${localStorage.getItem('hubCode')}&notifyType=${notifyType}`)
    if (updateConfigObject.success) {
      commit('updateNotifyType', notifyType)
      return updateConfigObject.success
    }
  },
  async notifyDriverByMan({
    commit,
    state
  }) {
    const notifyDriverByManObject = await get(END_POINTS.NOTIFY_DRIVER_BY_MAN + `?hubCode=${localStorage.getItem('hubCode')}`)
    if (notifyDriverByManObject.success) {
      return notifyDriverByManObject.success
    }
  }
}
const mutations = {
  updateDate(state, value) {
    state.date = value
  },
  updateNotifyEnable(state, enable) {
    state.notifyEnable = enable
  },
  updateNotifyTarget(state, notifyTarget) {
    state.notifyTarget = notifyTarget
  },
  updateNotifyType(state, notifyType) {
    state.notifyType = notifyType
  },
  updateEstChartInScreen(state, estCountArrayData) {
    state.estCountArray = estCountArrayData
  },
  updateInvalidEstChart(state) {
    state.notifyTarget = ''
    state.notifyType = ''
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
