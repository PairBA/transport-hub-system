import {
  get,
  post,
  END_POINTS
} from '@/api'

import {
  drawTripLine,
  addMarker,
  dealDistance,
  dealDuration,
  dateFormat
} from '@/utils'

const state = {
  areaName: '成都',
  driverType: 'TAXI',
  mtsOrgLocName: '',
  mtsOrgLocGps: [],
  mtsOrgDate: '',
  mtsOrgTime: '',
  mtsDestLocName: '',
  mtsDestLocGps: [],
  mtsDestDate: '',
  mtsDestTime: '',
  orgMin: '5',
  destMin: '5',
  activeTripStatus: '',
  closeMeter: false,
  gpsStepList: [],
  orgRetangle: {
    strokeColor: '#90B744',
    fillColor: '#FFAB91',
    bounds: []
  },
  destRetangle: {
    strokeColor: '#FF4D63',
    fillColor: '#FFAB91',
    bounds: []
  },
  meterTripLineCache: '',
  meterTripListObject: {
    meterTripList: [],
    showMeterTripList: [],
    currentPage: 1,
    pageSize: 4,
    total: 0,
    totalPage: 0
  },
  gpsListForAMap: {
    polylines: '',
    markers: [],
    meterTripId: '',
    recDate: ''
  },
  gpsList: {
    polylines: '',
    markers: [],
    meterTripId: '',
    recDate: '',
    bounds: {
      sw: {},
      ne: {}
    }
  }
}

const getters = {

}

const actions = {
  async getGpsStepList({
    commit,
    rootState
  }) {
    const responseData = await get(END_POINTS.GET_CODE_TYPE + `/${rootState.areaCodeForSelect}:OD_GRID`)
    if (responseData.code === 2001) {
      commit('updateGetGpsStepList', responseData.data)
    }
  },
  async getMeterTripSearchList({
    commit,
    state,
    rootState
  }) {
    let orgGpsLb = []
    if (state.orgRetangle.bounds.length) {
      orgGpsLb = state.orgRetangle.bounds[0]
    }
    let orgGpsRt = []
    if (state.orgRetangle.bounds.length) {
      orgGpsRt = state.orgRetangle.bounds[1]
    }
    let orgTimeStart = ''
    let orgTimeEnd = ''
    if (state.mtsOrgDate && state.mtsOrgTime) {
      let orgDateAndTimeStr = dateFormat(new Date(state.mtsOrgDate), 'yyyy-MM-dd') + ' ' + state.mtsOrgTime + ':00'
      let orgTimeStamp = new Date(orgDateAndTimeStr).getTime()
      let addAndSub = parseInt(state.orgMin) * 60 * 1000
      orgTimeStart = dateFormat(new Date(orgTimeStamp - addAndSub), 'yyyy-MM-dd hh:mm')
      orgTimeEnd = dateFormat(new Date(orgTimeStamp + addAndSub), 'yyyy-MM-dd hh:mm')
    }
    let destGpsLb = []
    if (state.destRetangle.bounds.length) {
      destGpsLb = state.destRetangle.bounds[0]
    }
    let destGpsRt = []
    if (state.destRetangle.bounds.length) {
      destGpsRt = state.destRetangle.bounds[1]
    }
    let destTimeStart = ''
    let destTimeEnd = ''
    if (state.mtsDestDate && state.mtsDestTime) {
      let destDateAndTimeStr = dateFormat(new Date(state.mtsDestDate), 'yyyy-MM-dd') + ' ' + state.mtsDestTime + ':00'
      let destTimeStamp = new Date(destDateAndTimeStr).getTime()
      let addAndSub = parseInt(state.destMin) * 60 * 1000
      destTimeStart = dateFormat(new Date(destTimeStamp - addAndSub), 'yyyy-MM-dd hh:mm')
      destTimeEnd = dateFormat(new Date(destTimeStamp + addAndSub), 'yyyy-MM-dd hh:mm')
    }
    const meterTripListObject = await post(END_POINTS.GET_METER_TRIP_SEARCH_LIST, {
      areaCode: rootState.areaCodeForSelect,
      driverType: state.driverType,
      orgGpsLb: orgGpsLb,
      orgGpsRt: orgGpsRt,
      orgTimeStart: orgTimeStart,
      orgTimeEnd: orgTimeEnd,
      destGpsLb: destGpsLb,
      destGpsRt: destGpsRt,
      destTimeStart: destTimeStart,
      destTimeEnd: destTimeEnd,
      closeMeter: state.closeMeter
    })
    commit('updateMeterTripListObject', meterTripListObject)
    return meterTripListObject
  },
  async getGpsListForMap({
    commit,
    state
  }, { meterTripId, recDate, mapType, location, dropOffLocation, duringTheTrip }) {
    const gpsListObject = await get(END_POINTS.GET_GPS_LIST + `?meterTripId=${meterTripId}&recDate=${recDate}&driverType=${state.driverType}`)
    if (gpsListObject.success) {
      commit('updateGetGpsListAMap', { gpsListObject: gpsListObject.data, location, dropOffLocation, duringTheTrip })
    } else {
      commit('emptyGetGpsListAMap')
    }
    return gpsListObject
  }
}

const mutations = {
  updateSearchOrgLocName(state, value) {
    state.mtsOrgLocName = value
  },
  updateSearchDestLocName(state, value) {
    state.mtsDestLocName = value
  },
  updateAreaName(state, value) {
    state.areaName = value
  },
  updateDriverType(state, value) {
    state.driverType = value
  },
  updateMtsOrgLocGps(state, value) {
    state.mtsOrgLocGps = value
  },
  updateMtsDestLocGps(state, value) {
    state.mtsDestLocGps = value
  },
  updateDestRetangleBounds(state, value) {
    state.destRetangle.bounds = value
  },
  updateOrgRetangleBounds(state, value) {
    state.orgRetangle.bounds = value
  },
  updateMeterTripMarkers(state, value) {
    state.gpsListForAMap.markers = value
  },
  updateMeterTripPolylines(state, value) {
    state.gpsListForAMap.polylines = value
  },
  updateMtsOrgDate(state, value) {
    state.mtsOrgDate = value
  },
  updateMtsOrgTime(state, value) {
    state.mtsOrgTime = value
  },
  updateMtsDestDate(state, value) {
    state.mtsDestDate = value
  },
  updateMtsDestTime(state, value) {
    state.mtsDestTime = value
  },
  updateOrgMin(state, value) {
    state.orgMin = value
  },
  updateDestMin(state, value) {
    state.destMin = value
  },
  updateActiveTripStatus(state, value) {
    state.activeTripStatus = value
  },
  updateCloseMeter(state, value) {
    state.closeMeter = value
  },
  updateGetGpsStepList(state, list) {
    state.gpsStepList = list
  },
  updateMeterTripListObjectPageSize(state, value) {
    state.meterTripListObject.pageSize = value
  },
  updateMeterTripListObjectCurrentPage(state, value) {
    state.meterTripListObject.currentPage = value
  },
  updateMeterTripListObjectShowMeterTripList(state, value) {
    state.meterTripListObject.showMeterTripList = value
  },
  updateMeterTripListObject(state, meterTripListObject) {
    if (meterTripListObject.code === 2001) {
      if (meterTripListObject.data && meterTripListObject.data.length) {
        state.meterTripListObject.meterTripList = meterTripListObject.data.map(value => {
          let timeDBoard = '-'
          if (value.timeDBoard) {
            timeDBoard = dateFormat(new Date(value.timeDBoard), 'hh:mm')
          }
          let timeDAlight = '-'
          if (value.timeDAlight) {
            timeDAlight = dateFormat(new Date(value.timeDAlight), 'hh:mm')
          }
          let distance = '-'
          if (value.distance) {
            distance = dealDistance(value.distance)
          }
          let duration = '-'
          if (value.duration) {
            duration = dealDuration(value.duration)
          }
          let orgGps = []
          if (value.orgLng && value.orgLat) {
            orgGps = [value.orgLng, value.orgLat]
          }
          let destGps = []
          if (value.destLng && value.destLat) {
            destGps = [value.destLng, value.destLat]
          }
          return {
            meterTripId: value.meterTripId, // meterTripId
            companyName: value.companyName,
            terminalName: value.terminalName,
            vehicleNo: value.vehicleNo, // 车辆号牌
            orgGps: orgGps, // 上客点gps
            orgLocName: value.orgLocName, // 上客点地址
            timeDBoard: timeDBoard, // 上车时间
            destGps: destGps, // 下客点gps
            destLocName: value.destLocName, // 下客点地址
            timeDAlight: timeDAlight, // 下车时间
            distance: distance, // 实际行驶距离（公里）
            duration: duration, // 实际行驶时间（分钟）
            activeTripStatus: value.tripStatus, // 行程状态
            recDate: value.recDate // 分表时间
          }
        })
        let total = meterTripListObject.data.length
        let currentPage = state.meterTripListObject.currentPage
        let pageSize = state.meterTripListObject.pageSize
        let totalPage = Math.ceil(total / pageSize)
        // 数据总条数
        state.meterTripListObject.total = total
        // 总数/每页大小向上取整得到总页数
        state.meterTripListObject.totalPage = totalPage
        // 当前页不大于总页数
        if (currentPage <= totalPage) {
          state.meterTripListObject.showMeterTripList = [] // 清空显示的列表
          for (let i = pageSize * (currentPage - 1) + 1;
            i <= ((total > pageSize * currentPage) ? (pageSize * currentPage) : (total));
            i++) {
            state.meterTripListObject.showMeterTripList.push(state.meterTripListObject.meterTripList[i - 1])
          }
        }
      } else {
        state.meterTripListObject.meterTripList = []
        state.meterTripListObject.showMeterTripList = []
        state.meterTripListObject.total = 0
        state.meterTripListObject.currentPage = 1
      }
    } else {
      state.meterTripListObject.meterTripList = []
      state.meterTripListObject.showMeterTripList = []
      state.meterTripListObject.total = 0
      state.meterTripListObject.currentPage = 1
    }
  },
  updateGetGpsListAMap(state, { gpsListObject, location, dropOffLocation, duringTheTrip }) {
    state.gpsListForAMap.polylines = ''
    state.gpsListForAMap.markers = []
    const otGpsHistList = gpsListObject.otGpsHistList
    if (otGpsHistList && otGpsHistList.length) {
      state.gpsListForAMap.polylines = drawTripLine(otGpsHistList, '#6AA84F')
      let markerStart = addMarker(otGpsHistList[0], require('@/img/tripDetail/icon_green.png'), location)
      let markerEnd = addMarker(otGpsHistList[otGpsHistList.length - 1], require('@/img/tripDetail/icon_red.png'), dropOffLocation)
      if (state.activeTripStatus === 'OT') {
        markerEnd = addMarker(otGpsHistList[otGpsHistList.length - 1], require('@/img/tripSharing/wtAndBdCar.png'), duringTheTrip)
      }
      state.gpsListForAMap.markers.push(markerStart)
      state.gpsListForAMap.markers.push(markerEnd)
    }
  },
  emptyGetGpsListAMap(state) {
    state.gpsListForAMap.polylines = ''
    state.gpsListForAMap.markers = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
