
import { get, post, END_POINTS } from '@/api'
import { dateFormat } from '@/utils'

const state = {
  vehicleNo: '川A',
  focusDate: [new Date(), new Date()],
  tableListObject: { // 前端分页的表格数据对象
    tableList: [],
    showTableList: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0
  }
}

const actions = {
  async getHubStatTrailList({ commit, state, rootState }) {
    const result = await post(END_POINTS.GET_HUB_STAT_TRAIL_LIST, {
      currentPage: state.tableListObject.currentPage,
      pageSize: state.tableListObject.pageSize,
      queryVO: {
        areaCode: localStorage.getItem('areaCode'),
        driverType: 'TAXI',
        startDate: dateFormat(new Date(state.focusDate[0]), 'yyyy-MM-dd'),
        endDate: dateFormat(new Date(state.focusDate[1]), 'yyyy-MM-dd'),
        hubCode: rootState.hubCode,
        type: 'ALL',
        vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo
      },
      refreshTotalRecord: true
    })
    commit('updateHubStatTrailList', result)
    return result
  },
  async getVehicleInfoByNo({ commit, state }) {
    const result = await get(END_POINTS.GET_VEHICLE_INFO_BY_NO, {
      vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo
    })
    commit('updateVehicleInfoByNo', result)
    return result
  },
  async isVehicleFocus({ commit, state }) {
    const result = await get(END_POINTS.IS_VEHICLE_FOCUS, {
      vehicleNo: state.vehicleNo === '川A' ? '' : state.vehicleNo
    })
    commit('updateIsVehicleFocus', result)
    return result
  }
}

const mutations = {
  updateVehicleNo(state, value) {
    state.vehicleNo = value
  },
  updateFocusDate(state, value) {
    state.focusDate = value
  },
  updateTableListObjectPageSize(state, value) {
    state.tableListObject.pageSize = value
  },
  updateTableListObjectCurrentPage(state, value) {
    state.tableListObject.currentPage = value
  },
  updateTableListObjectShowTableList(state, value) {
    state.tableListObject.showTableList = value
  },
  updateHubStatTrailList(state, result) {
    if (result.code === 2001) {
      if (result.data && result.data.length) {
        // 缓存表格全部数据
        state.tableListObject.tableList = result.data.map(item => {
          let realLocation = false
          if (item.companyName && item.terminalName) { // 有公司和终端信息的才显示实时位置
            realLocation = true
          }
          return {
            vehicleNo: item.vehicleNo,
            companyName: item.companyName,
            terminalName: item.terminalName,
            focus: item.focus, // 是否被关注
            realLocation: realLocation, // 是否显示实时位置操作
            sumOn: item.sumOn, // 发车量
            sumOnAlert: item.sumOnAlert, // 违规上客
            sumQcut: item.sumQcut // 异常排队
          }
        })
        state.tableListObject.currentPage = result.currentPage
        state.tableListObject.pageSize = result.pageSize
        state.tableListObject.totalPage = result.totalPage
        state.tableListObject.total = result.total
      } else {
        state.tableListObject.tableList = []
        state.tableListObject.showTableList = []
        state.tableListObject.total = 0
        state.tableListObject.currentPage = 1
      }
    } else {
      state.tableListObject.tableList = []
      state.tableListObject.showTableList = []
      state.tableListObject.total = 0
      state.tableListObject.currentPage = 1
    }
  },
  updateVehicleInfoByNo(state, result) {
    if (result.code === 2001) {
      let realLocation = false
      if (result.data.companyName && result.data.terminalName) {
        realLocation = true
      }
      state.tableListObject.tableList = [
        {
          vehicleNo: result.data.vehicleNo,
          companyName: result.data.companyName,
          terminalName: result.data.terminalName,
          focus: result.data.focus, // 是否被关注
          realLocation: realLocation, // 是否显示实时位置操作
          sumOn: 0, // 发车量
          sumOnAlert: 0, // 违规上客
          sumQcut: 0 // 异常排队
        }
      ]
      state.tableListObject.showTableList = state.tableListObject.tableList
      state.tableListObject.currentPage = 1
      state.tableListObject.totalPage = 1
      state.tableListObject.total = 1
    } else {
      state.tableListObject.tableList = []
      state.tableListObject.showTableList = []
      state.tableListObject.total = 0
      state.tableListObject.currentPage = 1
    }
  },
  updateIsVehicleFocus(state, result) {
    let focus = false
    if (result.code === 2000) {
      focus = true
    }
    state.tableListObject.tableList = [
      {
        vehicleNo: state.vehicleNo,
        companyName: '',
        terminalName: '',
        focus: focus, // 是否被关注
        realLocation: false, // 是否显示实时位置操作
        sumOn: 0, // 发车量
        sumOnAlert: 0, // 违规上客
        sumQcut: 0 // 异常排队
      }
    ]
    state.tableListObject.showTableList = state.tableListObject.tableList
    state.tableListObject.currentPage = 1
    state.tableListObject.totalPage = 1
    state.tableListObject.total = 1
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
