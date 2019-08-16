import {
  END_POINTS,
  get
} from '@/api'
import { dateFormat } from '@/utils'
const state = {
  date: new Date(),
  planDetailList: [],
  scheduleList: [],
  planWorkerList: [],
  monthDayList: []
}
const actions = {
  async getScheduleList({
    commit
  }) {
    const result = await get(END_POINTS.GET_SCHEDULE_LIST)
    commit('updateScheduleList', result)
  },
  async getPlanDetailList({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_PLAN_DETAIL_LIST + `?queryMonth=${dateFormat(state.date, 'yyyy-MM')}`)
    commit('updatePlanDetailList', result)
  },
  async getPlanWorkerList({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_PLAN_WORKER_LIST)
    if (result) this.planWorkerList = result.data
    commit('updatePlanWorkerList', result)
  }
}
const mutations = {
  updateDate(state, value) {
    state.date = value
  },
  updatePlanDetailList(state, value) {
    state.planDetailList = value.code === 2000 ? value.data : []
  },
  updateScheduleList(state, value) {
    state.scheduleList = value.success ? value.data : []
  },
  updatePlanWorkerList(state, value) {
    state.planWorkerList = value.success ? value.data : []
  },
  updateMonthDayList(state, value) {
    state.monthDayList = value
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
