const mutations = {
  updateAreaCodeListForSelect(state, areaCodeListForSelect) {
    state.areaCodeListForSelect = areaCodeListForSelect
  },
  updateAreaCodeForSelect(state, areaCodeForSelect) {
    state.areaCodeForSelect = areaCodeForSelect
  },
  updateCompanyListForSelect(state, companyListForSelect) {
    state.companyListForSelect = companyListForSelect
    if (localStorage.getItem('role')) state.companyIdForSelect = companyListForSelect[0].id
  },
  updateCompanyIdForSelect(state, companyId) {
    state.companyIdForSelect = companyId
  },
  updateTerminalList(state, value) {
    state.terminalList = value
  },
  updateCenterGps(state, centerGps) {
    state.center = centerGps
  }
}
export default mutations
