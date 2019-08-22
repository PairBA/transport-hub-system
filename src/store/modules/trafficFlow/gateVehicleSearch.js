import {
  post,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  vehicleNo: '',
  gateName: '',
  startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  startTime: '00:00',
  endDate: new Date(),
  endTime: dateFormat(new Date(), 'hh') + ':00',
  list: []
}
const actions = {
  async getGateVehicleList({
    commit,
    state
  }, { currentPage }) {
    const result = await post(END_POINTS.GET_GATE_VEHICLE_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        hubCode: localStorage.getItem('hubCode'),
        gateName: state.gateName,
        startDate: dateFormat(state.startDate, 'yyyy-MM-dd') + ' ' + state.startTime,
        endDate: dateFormat(state.endDate, 'yyyy-MM-dd') + ' ' + state.endTime,
        vehicleNo: state.vehicleNo
      },
      refreshTotalRecord: true
    })
    commit('updateGateVehicleList', result)
  }
}
const mutations = {
  updateGateName(state, value) {
    state.gateName = value
  },
  updateStartDate(state, value) {
    state.startDate = value
  },
  updateStartTime(state, value) {
    state.startTime = value
  },
  updateEndDate(state, value) {
    state.endDate = value
  },
  updateEndTime(state, value) {
    state.endTime = value
  },
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateGateVehicleList(state, result) {
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
