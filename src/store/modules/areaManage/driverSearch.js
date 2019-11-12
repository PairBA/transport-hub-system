import {
  post,
  END_POINTS
} from '@/api'

const state = {
  driverType: 'TAXI',
  driverName: '',
  driverNumber: '',
  serviceNumber: '',
  tableObj: { // 列表的对象
    tableList: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
}
const actions = {
  async getDSTableObj({
    commit,
    state,
    rootState
  }, { currentPage }) {
    const response = await post(END_POINTS.GET_DRIVER_BASE_INFO_LIST, {
      currentPage,
      pageSize: state.tableObj.pageSize,
      queryVO: {
        driverType: state.driverType,
        driverName: state.driverName,
        companyId: rootState.companyIdForSelect,
        idCard: state.driverNumber,
        jobSeniorityCard: state.serviceNumber
      },
      refreshTotalRecord: true
    })
    commit('updateDSTableObj', response)
  }
}
const mutations = {
  updateDSDriverType(state, value) {
    state.driverType = value
  },
  updateDSDriverName(state, value) {
    state.driverName = value
  },
  updateDSDriverNumber(state, value) {
    state.driverNumber = value
  },
  updateDSServiceNumber(state, value) {
    state.serviceNumber = value
  },
  updateDSTableObj(state, response) {
    if (response.code === 2001) {
      state.tableObj.tableList = response.data
      state.tableObj.currentPage = response.currentPage
      state.tableObj.total = response.total
    } else {
      state.tableObj.tableList = []
      state.tableObj.currentPage = 1
      state.tableObj.total = 0
    }
  },
  updateDSPageSize(state, value) {
    state.tableObj.pageSize = value
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
