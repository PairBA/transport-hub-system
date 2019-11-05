import {
  post,
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  startTime: '00:00',
  endDate: new Date(),
  endTime: dateFormat(new Date(), 'hh') + ':00',
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
    if (state.judgeType.some(item => item === ' ')) judgeType = ' '
    const result = await post(END_POINTS.GET_GATE_JUDGE_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        judgeType,
        startDate: dateFormat(state.startDate, 'yyyy-MM-dd') + ' ' + state.startTime,
        endDate: dateFormat(state.endDate, 'yyyy-MM-dd') + ' ' + state.endTime,
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
    if (state.judgeType.some(item => item === ' ')) judgeType = ' '
    const result = await get(END_POINTS.GET_GATE_JUDGE_GRAPH, {
      judgeType,
      gateName: state.gateName,
      startDate: dateFormat(state.startDate, 'yyyy-MM-dd') + ' ' + state.startTime,
      endDate: dateFormat(state.endDate, 'yyyy-MM-dd') + ' ' + state.endTime,
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
  updateStartDate(state, value) {
    state.startDate = value
  },
  updateEndDate(state, value) {
    state.endDate = value
  },
  updateStartTime(state, value) {
    state.startTime = value
  },
  updateEndTime(state, value) {
    state.endTime = value
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
