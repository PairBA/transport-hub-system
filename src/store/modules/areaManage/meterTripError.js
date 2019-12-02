import {
  post,
  END_POINTS
} from '@/api'

const state = {
  mteTerminalCode: '',
  mteJudgeType: '',
  mteVehicleNo: '川A',
  mteDateRange: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date(new Date().getTime() - 24 * 60 * 60 * 1000)],
  tableObj: { // 列表的对象
    tableList: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
}
const actions = {
  async getMTETableObj({ commit, state, rootState }, { currentPage }) {
    const response = await post(END_POINTS.GET_METER_ERROR_LIST, {
      currentPage,
      pageSize: state.tableObj.pageSize,
      queryVO: {
        areaCode: rootState.areaCodeForSelect,
        companyId: rootState.companyIdForSelect,
        terminalCode: state.mteTerminalCode,
        judgeType: state.mteJudgeType === '0' ? '' : state.mteJudgeType,
        vehicleNo: state.mteVehicleNo === '川A' ? '' : state.mteVehicleNo,
        startDate: state.mteDateRange[0].getTime(),
        endDate: state.mteDateRange[1].getTime()
      },
      refreshTotalRecord: true
    })
    commit('updateMTETableObj', response)
  }
}
const mutations = {
  updateMteTerminalCode(state, value) {
    state.mteTerminalCode = value
  },
  updateMteJudgeType(state, value) {
    state.mteJudgeType = value
  },
  updateMteVehicleNo(state, value) {
    state.mteVehicleNo = value
  },
  updateMteDateRange(state, value) {
    state.mteDateRange = value
  },
  updateMTETableObj(state, response) {
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
  updateMTEPageSize(state, value) {
    state.tableObj.pageSize = value
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
