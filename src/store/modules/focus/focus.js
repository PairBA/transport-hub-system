
import { get, END_POINTS } from '@/api'
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
  async getHubFocusVehicleList({ commit, state }) {
    const result = await get(END_POINTS.GET_HUB_FOCUS_VEHICLE_LIST, {
      startDate: dateFormat(new Date(state.focusDate[0]), 'yyyy-MM-dd'),
      endDate: dateFormat(new Date(state.focusDate[1]), 'yyyy-MM-dd'),
      areaCode: localStorage.getItem('areaCode'),
      hubCode: localStorage.getItem('hubCode'),
      vehicleNo: state.vehicleNo,
      driverType: 'TAXI'
    })
    commit('updateHubFocusVehicleList', result)
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
  updateHubFocusVehicleList(state, result) {
    if (result.code === 2000) {
      if (result.data && result.data.length) {
        // 缓存表格全部数据
        state.tableListObject.tableList = result.data
        // 前端分页
        let total = result.data.length
        let currentPage = state.tableListObject.currentPage
        let pageSize = state.tableListObject.pageSize
        let totalPage = Math.ceil(total / pageSize)
        // 数据总条数
        state.tableListObject.total = total
        // 总数/每页大小向上取整得到总页数
        state.tableListObject.totalPage = totalPage
        // 当前页不大于总页数
        if (currentPage <= totalPage) {
          state.tableListObject.showTableList = [] // 清空显示的列表
          for (let i = pageSize * (currentPage - 1) + 1;
            i <= ((total > pageSize * currentPage) ? (pageSize * currentPage) : (total));
            i++) {
            state.tableListObject.showTableList.push(state.tableListObject.tableList[i - 1])
          }
        }
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
