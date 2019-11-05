import {
  post,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  vehicleNo: '',
  terminalName: '',
  daterange: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date(new Date().getTime() - 24 * 60 * 60 * 1000)],
  list: [],
  currentPage: 1,
  pageSize: 10,
  total: 0,
  graphData: ''
}
const actions = {
  async getGpsErrorStatList({
    commit,
    state,
    rootState
  }, { currentPage }) {
    const result = await post(END_POINTS.GET_GPS_ERROR_STAT_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd') + ' 00:00',
        endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd') + ' 23:59',
        areaCode: localStorage.getItem('areaCode'),
        vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo,
        terminalName: state.terminalName,
        companyId: rootState.companyId
      },
      refreshTotalRecord: true
    })
    commit('updateGpsErrorStat', result)
  }
}
const mutations = {
  updateTerminalName(state, value) {
    state.terminalName = value
  },
  updateDaterange(state, value) {
    state.daterange = value
  },
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateGpsErrorStat(state, result) {
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
