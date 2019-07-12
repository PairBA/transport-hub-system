import {
  get,
  END_POINTS
} from '@/api'

const actions = {
  async getAreaCodeName ({
    commit
  }) {
    const token = localStorage.getItem('token')
    const areaCodeNameListForSelectObj = await get(END_POINTS.GET_AREA_CODE_NAME, token)
    if (areaCodeNameListForSelectObj.success) {
      commit('updateAreaCodeListForSelect', areaCodeNameListForSelectObj.data)
    }
  },
  async getCompListForSelect ({
    commit,
    state
  }, value) {
    let driverType = ''
    if (value) driverType = value
    const token = localStorage.getItem('token')
    const compListForSelectObj = await get(END_POINTS.GET_COMP_LIST_FOR_SELECT_BY_AREA_CODE + `?areaCode=${state.areaCodeForSelect}&driverType=${driverType}`, token)
    if (compListForSelectObj.success) {
      commit('updateCompanyListForSelect', compListForSelectObj.data)
    }
  },
  async getTerminalList ({
    commit,
    state
  }) {
    const token = localStorage.getItem('token')
    const compListForSelectObj = await get(END_POINTS.GET_TERMINAL_LIST + `?areaCode=${state.areaCodeForSelect}`, token)
    if (compListForSelectObj.code === 2000) {
      commit('updateTerminalList', compListForSelectObj.data)
    } else commit('updateTerminalList', [])
  },
  async getCenterGpsByAreaCode ({
    commit,
    state
  }, areaCode) {
    const token = localStorage.getItem('token')
    const centerGpsObject = await get(END_POINTS.GET_CENTER_GPS_BY_AREA_CODE + `?areaCode=${areaCode}`, token)
    if (centerGpsObject.success) {
      commit('updateCenterGps', centerGpsObject.data)
    }
  }
}
export default actions
