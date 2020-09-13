import {
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  GPSGraphData: '',
  startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  endDate: new Date(),
  startHour: '00:00',
  endHour: '23:59',
  vehicleNo: ''
}
const actions = {
  async getGpsPointCount({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_GPS_POINT_COUNT, {
      areaCode: localStorage.getItem('areaCode'),
      vehicleNo: state.vehicleNo,
      startDate: dateFormat(state.startDate, 'yyyy-MM-dd ') + state.startHour,
      endDate: dateFormat(state.endDate, 'yyyy-MM-dd ') + state.endHour
    })
    if (result.success) {
      commit('updateGPSGraphData', result.data)
    }
    return result
  }
}
const mutations = {
  updateStartDate(state, value) {
    state.startDate = value
  },
  updateStartHour(state, value) {
    state.startHour = value
  },
  updateEndDate(state, value) {
    state.endDate = value
  },
  updateEndHour(state, value) {
    state.endHour = value
  },
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
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
