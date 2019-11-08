import {
  get,
  END_POINTS
} from '@/api'

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
        estDate: state.searchDate
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
