import {
  get,
  END_POINTS
} from '@/api'

import { dateFormat } from '@/utils'

const state = {
  searchDate: new Date(),
  notifyTarget: '',
  notifyType: '',
  notifyEnable: true,
  estChart: {
    estCountArray: []
  }
}

const actions = {
  async loadEstChartInScreen({ commit, state, rootState }) {
    const configResp = await get(END_POINTS.GET_TRANSPORT_NOTIFY_CONFIG, {
      areaCode: rootState.areaCodeForSelect,
      hubCode: rootState.hubCode
    })
    if (configResp.code === 2001) {
      commit('updateNotifyTarget', configResp.data.notifyRange)
      commit('updateNotifyType', configResp.data.notifyType)
      commit('updateNotifyEnable', false)
      const dynamicResp = await get(END_POINTS.GET_DYNAMIC_DATA, {
        hubCode: rootState.hubCode,
        estDate: dateFormat(state.searchDate, 'yyyy-MM-dd')
      })
      if (dynamicResp.code === 2001) {
        commit('updateEstChartInScreen', dynamicResp.data)
      } else {
        commit('updateEstChartInScreen', [])
      }
    } else {
      commit('updateInvalidEstChart')
      commit('updateNotifyEnable', true)
    }
  },
  async notifyDriverByMan({ rootState }) {
    const response = await get(END_POINTS.NOTIFY_DRIVER_BY_MAN, {
      hubCode: rootState.hubCode
    })
    return response
  },
  async updateHubNotifyTypeInScreen({ commit, state, rootState }, notifyType) {
    const response = await get(END_POINTS.UPDATE_HUB_NOTIFY_TYPE, {
      hubCode: rootState.hubCode,
      notifyType: notifyType
    })
    if (response.success) {
      commit('updateNotifyType', notifyType)
    }
    return response
  },
  async updateHubNotifyConfigInScreen({ commit, state, rootState }, notifyTarget) {
    const response = await get(END_POINTS.UPDATE_HUB_NOTIFY_CONFIG, {
      hubCode: rootState.hubCode,
      notifyRange: notifyTarget
    })
    if (response.success) {
      commit('updateNotifyTarget', notifyTarget)
    }
    return response
  }
}

const mutations = {
  updateSearchDate(state, value) {
    state.searchDate = value
  },
  updateNotifyTarget(state, value) {
    state.notifyTarget = value
  },
  updateNotifyType(state, value) {
    state.notifyType = value
  },
  updateNotifyEnable(state, value) {
    state.notifyEnable = value
  },
  updateEstChartInScreen(state, dynamicData) {
    state.estChart.estCountArray = dynamicData
  },
  updateInvalidEstChart(state) {
    state.notifyTarget = ''
    state.notifyType = ''
    state.notifyEnable = true
    state.estChart.estCountArray = []
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
