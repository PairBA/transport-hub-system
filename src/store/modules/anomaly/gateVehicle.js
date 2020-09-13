import {
  post,
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  dateRange: [
    new Date(dateFormat(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 'yyyy/MM/dd') + ' 00:00:00'),
    new Date(dateFormat(new Date(new Date().getTime()), 'yyyy/MM/dd') + ' 00:00:00')
  ],
  judgeType: [],
  vehicleNo: '',
  gateName: '',
  terminalName: '',
  gateJudgeList: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  graphData: ''
}
const actions = {
  async getGateJudgeList({
    commit,
    state,
    rootState
  }, { currentPage }) {
    let judgeType = state.judgeType.join('::')
    if (state.judgeType.some(item => item === ' ')) {
      judgeType = 'GPS_LOST::GPS_REPEAT::GPS_TIME_ERROR::NO_GPS_UPLOAD'
    } else if (state.judgeType[0] === '') {
      judgeType = 'GPS_LOST::GPS_REPEAT::GPS_TIME_ERROR::NO_GPS_UPLOAD'
    }
    const result = await post(END_POINTS.GET_GATE_JUDGE_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        judgeType,
        gateName: state.gateName,
        startDate: dateFormat(state.dateRange[0], 'yyyy-MM-dd') + ' 00:00',
        endDate: dateFormat(state.dateRange[1], 'yyyy-MM-dd') + ' 23:59',
        areaCode: rootState.areaCodeForSelect,
        hubCode: rootState.hubCode,
        companyId: rootState.companyIdForSelect,
        terminalName: state.terminalName,
        vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo
      },
      refreshTotalRecord: true
    })
    commit('updateGateVehicle', result)
  },
  async getGateJudgeGraph({
    commit,
    state,
    rootState
  }) {
    let judgeType = state.judgeType.join('::')
    if (state.judgeType.some(item => item === ' ')) {
      judgeType = 'GPS_LOST::GPS_REPEAT::GPS_TIME_ERROR::NO_GPS_UPLOAD'
    } else if (state.judgeType[0] === '') {
      judgeType = 'GPS_LOST::GPS_REPEAT::GPS_TIME_ERROR::NO_GPS_UPLOAD'
    }
    const result = await get(END_POINTS.GET_GATE_JUDGE_GRAPH, {
      judgeType,
      gateName: state.gateName,
      startDate: dateFormat(state.dateRange[0], 'yyyy-MM-dd') + ' 00:00',
      endDate: dateFormat(state.dateRange[1], 'yyyy-MM-dd') + ' 23:59',
      areaCode: rootState.areaCodeForSelect,
      hubCode: rootState.hubCode,
      companyId: rootState.companyIdForSelect,
      terminalName: state.terminalName,
      vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo
    })
    commit('updateGraph', result)
  }
}
const mutations = {
  updateGraph(state, value) {
    state.graphData = value.code === 2000 ? value.data : ''
  },
  updateDateRange(state, value) {
    state.dateRange = value
  },
  updateGateName(state, gateName) {
    state.gateName = gateName
  },
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateJudgeType(state, value) {
    state.judgeType = value
  },
  updateTerminalName(state, value) {
    state.terminalName = value
  },
  updateGateVehicle(state, result) {
    if (result.code === 2001) {
      state.currentPage = result.currentPage
      state.pageSize = result.pageSize
      state.gateJudgeList = result.data
      state.total = result.total
    } else {
      state.currentPage = 1
      state.total = 0
      state.gateJudgeList = []
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
