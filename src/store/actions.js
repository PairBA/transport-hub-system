import {
  get,
  END_POINTS
} from '@/api'

const actions = {
  async getCompListForSelect({
    commit,
    state
  }, value) {
    let driverType = ''
    if (value) driverType = value
    const compListForSelectObj = await get(END_POINTS.GET_COMP_LIST_FOR_SELECT_BY_AREA_CODE + `?areaCode=${state.areaCodeForSelect}&driverType=${driverType}`)
    if (compListForSelectObj.success) {
      commit('updateCompanyListForSelect', compListForSelectObj.data)
    }
  },
  async getTerminalList({
    commit,
    state
  }) {
    const compListForSelectObj = await get(END_POINTS.GET_TERMINAL_LIST + `?areaCode=${state.areaCodeForSelect}`)
    if (compListForSelectObj.code === 2000) {
      commit('updateTerminalList', compListForSelectObj.data)
    } else commit('updateTerminalList', [])
  },
  async getCenterGpsByAreaCode({
    commit,
    state
  }, areaCode) {
    const centerGpsObject = await get(END_POINTS.GET_CENTER_GPS_BY_AREA_CODE + `?areaCode=${areaCode}`)
    if (centerGpsObject.success) {
      commit('updateCenterGps', centerGpsObject.data)
    }
  }
}
export default actions
