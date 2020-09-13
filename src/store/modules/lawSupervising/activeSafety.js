import { post, END_POINTS } from '@/api'

import { dateFormat } from '@/utils'

const state = {
  asVehicleNo: '川A',
  asTerminalCode: '0', // 0代表为全部，iview的select不能识别空串，传参时自己转换一次
  asAlarmType: '0', // 0代表为全部，iview的select不能识别空串，传参时自己转换一次
  asDateRange: [new Date(), new Date()],
  tableObj: { // 列表的对象
    tableList: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
}

const actions = {
  async getASTableObj({
    commit,
    state,
    rootState
  }, { currentPage }) {
    const response = await post(END_POINTS.GET_VEHICLE_ALARM_LIST, {
      currentPage,
      pageSize: state.tableObj.pageSize,
      queryVO: {
        companyId: rootState.companyIdForSelect,
        vehicleNo: state.asVehicleNo === '川A' ? '' : state.asVehicleNo,
        terminalCode: state.asTerminalCode === '0' ? '' : state.asTerminalCode,
        alarmType: state.asAlarmType === '0' ? '' : state.asAlarmType,
        startDate: dateFormat(state.asDateRange[0], 'yyyy-MM-dd'),
        endDate: dateFormat(state.asDateRange[1], 'yyyy-MM-dd')
      },
      refreshTotalRecord: true
    })
    commit('updateASTableObj', response)
  }
}
const mutations = {
  updateASVehicleNo(state, value) {
    state.asVehicleNo = value
  },
  updateAsTerminalCode(state, value) {
    state.asTerminalCode = value
  },
  updateAsAlarmType(state, value) {
    state.asAlarmType = value
  },
  updateAsDateRange(state, value) {
    state.asDateRange = value
  },
  updateASPageSize(state, value) {
    state.tableObj.pageSize = value
  },
  updateASTableObj(state, response) {
    if (response.code === 2001) {
      state.tableObj.tableList = response.data
      state.tableObj.currentPage = response.currentPage
      state.tableObj.total = response.total
    } else {
      state.tableObj.tableList = []
      state.tableObj.currentPage = 1
      state.tableObj.total = 0
    }
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
