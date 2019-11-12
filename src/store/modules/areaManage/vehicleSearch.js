import {
  post,
  END_POINTS
} from '@/api'

const state = {
  driverType: 'TAXI',
  vehicleNo: '川A',
  selfNumber: '',
  tableObj: { // 列表的对象
    tableList: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
}
const actions = {
  async getVSTableObj({
    commit,
    state,
    rootState
  }, { currentPage }) {
    const response = await post(END_POINTS.GET_VEHICLE_INFO_LIST, {
      currentPage,
      pageSize: state.tableObj.pageSize,
      queryVO: {
        areaCode: rootState.areaCodeForSelect,
        driverType: state.driverType,
        companyId: rootState.companyIdForSelect,
        vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo,
        customNum: state.selfNumber
      },
      refreshTotalRecord: true
    })
    commit('updateVSTableObj', response)
  }
}
const mutations = {
  updateVSDriverType(state, value) {
    state.driverType = value
  },
  updateVSVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateVSSelfNumber(state, value) {
    state.selfNumber = value
  },
  updateVSTableObj(state, response) {
    if (response.code === 2001) {
      state.tableObj.tableList = response.data
      state.tableObj.currentPage = response.currentPage
      state.tableObj.total = response.total
    } else if (response.code === 2006) {
      state.tableObj.tableList = [
        {
          vehicleNo: state.vehicleNo
        }
      ]
      state.tableObj.currentPage = 1
      state.tableObj.total = 1
    } else {
      state.tableObj.tableList = []
      state.tableObj.currentPage = 1
      state.tableObj.total = 0
    }
  },
  updateVSPageSize(state, value) {
    state.tableObj.pageSize = value
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
