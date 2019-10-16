import {
  post,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  GPSGraphData: ''
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
        startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd'),
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
  updateGPSGraphData(state, GPSGraphData) {
    state.GPSGraphData = GPSGraphData
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
