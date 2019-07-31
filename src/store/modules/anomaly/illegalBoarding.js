import {
  post,
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  vehicleNo: '',
  daterange: [new Date(), new Date()],
  list: [],
  currentPage: 1,
  pageSize: 10,
  total: 0,
  graphData: ''
}
const actions = {
  async getHubStatTrailList({
    commit,
    state,
    rootState
  }, { currentPage }) {
    const result = await post(END_POINTS.GET_HUB_STAT_TRAIL_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        hubCode: localStorage.getItem('hubCode'),
        startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd'),
        vehicleNo: state.vehicleNo,
        type: 'ALERT_ON',
        areaCode: localStorage.getItem('areaCode'),
        driverType: 'TAXI',
        gps: null
      },
      refreshTotalRecord: true
    })
    commit('updateIllegalBoarding', result)
  },
  async getHubStatTrailGraph({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_HUB_STAT_TRAIL_GRAPH, {
      hubCode: localStorage.getItem('hubCode'),
      startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd'),
      endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd'),
      vehicleNo: state.vehicleNo,
      type: 'ALERT_ON',
      areaCode: localStorage.getItem('areaCode'),
      driverType: 'TAXI',
      gps: null
    })
    commit('updateGraph', result)
  }
}
const mutations = {
  updateGraph(state, value) {
    state.graphData = value.code === 2000 ? value.data : ''
  },
  updateDaterange(state, value) {
    state.daterange = value
  },
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateIllegalBoarding(state, result) {
    if (result.code === 2001) {
      state.currentPage = result.currentPage
      state.pageSize = result.pageSize
      state.list = result.data
      state.total = result.total
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
