import {
  get,
  post,
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
  },
  list: [],
  total: 0,
  currentPage: 1,
  pageSize: 10
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
  },
  async getNotifyHistList({ commit, state, rootState }, { currentPage }) {
    const response = await post(END_POINTS.GET_NOTIFY_HIST_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        hubCode: rootState.hubCode
      },
      refreshTotalRecord: true
    })
    commit('updateNotifyHistList', response)
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
  },
  updateNotifyHistList(state, response) {
    if (response.code === 2001) {
      state.currentPage = response.currentPage
      state.pageSize = response.pageSize
      state.list = response.data
      state.total = response.total
    } else {
      state.currentPage = 1
      state.total = 0
      state.list = []
    }
  },
  updatePageSize(state, value) {
    state.pageSize = value
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
