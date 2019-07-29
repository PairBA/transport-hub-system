const state = {
  // 是否展示loading
  showSpin: false,
  // 车辆轨迹相关的数据对象
  vehTraObj: {
    tripStatusAndGpsInfo: [],
    polylines: [],
    allGpsList: [],
    timeForGpsList: []
  },
  // 车流量相关的数据对象
  traFloObj: {
    countType: 'HOUR', // 统计方式
    showEchart: false, // 是否显示图表
    echartsInfo: null, // echarts的数据
    gateVehicleNum: 0, // 总闸口车辆数
    normalVehicleNum: 0, // 总发车辆
    tableListObject: { // 前端分页的表格数据对象
      tableList: [],
      showTableList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0
    }
  }
}

const mutations = {
  // 是否展示loading
  updateShowSpin(state, value) {
    state.showSpin = value
  },
  // 车辆轨迹相关的数据对象
  updateVehTraObjTripStatusAndGpsInfo(state, value) {
    state.vehTraObj.tripStatusAndGpsInfo = value
  },
  updateVehTraObjPolylines(state, value) {
    state.vehTraObj.polylines = value
  },
  updateVehTraObjAllGpsList(state, value) {
    state.vehTraObj.allGpsList = value
  },
  updateVehTraObjTimeForGpsList(state, value) {
    state.vehTraObj.timeForGpsList = value
  },
  // 车流量相关的数据对象
  updateTraFloObjCountType(state, value) {
    state.traFloObj.countType = value
  },
  updateTraFloObjShowEchart(state, value) {
    state.traFloObj.showEchart = value
  },
  updateTraFloObjEchartsInfo(state, value) {
    state.traFloObj.echartsInfo = value
  },
  updateTraFloObjGateVehicleNum(state, value) {
    state.traFloObj.gateVehicleNum = value
  },
  updateTraFloObjNormalVehicleNum(state, value) {
    state.traFloObj.normalVehicleNum = value
  },
  updateTraFloObjTableListObjectTableList(state, value) {
    state.traFloObj.tableListObject.tableList = value
  },
  updateTraFloObjTableListObjectShowTableList(state, value) {
    state.traFloObj.tableListObject.showTableList = value
  },
  updateTraFloObjTableListObjectCurrentPage(state, value) {
    state.traFloObj.tableListObject.currentPage = value
  },
  updateTraFloObjTableListObjectPageSize(state, value) {
    state.traFloObj.tableListObject.pageSize = value
  },
  updateTraFloObjTableListObjectTotal(state, value) {
    state.traFloObj.tableListObject.total = value
  },
  updateTraFloObjTableListObjectTotalPage(state, value) {
    state.traFloObj.tableListObject.totalPage = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
