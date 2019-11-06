import {
  post,
  END_POINTS
} from '@/api'

const state = {
  driverType: 'TAXI',
  driverNo: '川A',
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
  }, { currentPage = 1 }) {
    const response = await post(END_POINTS.GET_GATE_VEHICLE_LIST, {
      currentPage,
      pageSize: state.pageSize,
      queryVO: {
        hubCode: rootState.hubCode
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
  updateVSDriverNo(state, value) {
    state.driverNo = value
  },
  updateVSSelfNumber(state, value) {
    state.selfNumber = value
  },
  updateVSTableObj(state, response) {
    if (response.code === 2001) {
      state.tableObj.list = response.data
      state.tableObj.currentPage = response.currentPage
      state.tableObj.total = response.total
    } else {
      state.tableObj.list = []
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
