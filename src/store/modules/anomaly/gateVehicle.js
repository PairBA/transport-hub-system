import {
  post,
  get,
  END_POINTS
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  daterange: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date()],
  judgeType: [],
  vehicleNo: '',
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
    const result = await post(END_POINTS.GET_GATE_JUDGE_LIST, {
      currentPage,
      orderBy: '',
      pageSize: state.pageSize,
      queryVO: {
        judgeType: state.judgeType.join('::'),
        startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd'),
        areaCode: rootState.areaCodeForSelect,
        hubCode: localStorage.getItem('hubCode'),
        companyId: rootState.companyIdForSelect,
        terminalName: state.terminalName,
        vehicleNo: state.vehicleNo
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
    const result = await get(END_POINTS.GET_GATE_JUDGE_GRAPH, {
      judgeType: state.judgeType.join('::'),
      startDate: dateFormat(new Date(state.daterange[0]), 'yyyy-MM-dd'),
      endDate: dateFormat(new Date(state.daterange[1]), 'yyyy-MM-dd'),
      areaCode: rootState.areaCodeForSelect,
      hubCode: localStorage.getItem('hubCode'),
      companyId: rootState.companyIdForSelect,
      terminalName: state.terminalName,
      vehicleNo: state.vehicleNo
    })
    commit('updateGraph', result)
  }
}
const mutations = {
  updateGraph(state, value) {
    state.graphData = value.code === 2000 ? value.data : ''
  },
  updateDaterange(state, value) {
    state.daterange = value
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
