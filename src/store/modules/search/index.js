const state = {
  // 是否展示loading
  showSpin: false,
  // 车辆轨迹相关的数据对象
  vehTraObj: {
    tripStatusAndGpsInfo: [],
    polylines: [],
    allGpsList: [],
    timeForGpsList: []
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
