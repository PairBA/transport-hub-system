const mutations = {
  updateCompanyListForSelect(state, companyListForSelect) {
    state.companyListForSelect = companyListForSelect
    if (localStorage.getItem('role')) state.companyIdForSelect = companyListForSelect[0].id
  },
  updateCompanyIdForSelect(state, companyId) {
    state.companyIdForSelect = companyId
  },
  updateTerminalList(state, value) {
    const terminalCode = localStorage.getItem('hub-terminalCode')
    state.terminalList = terminalCode ? value.filter(item => item.terminalCode === terminalCode) : value
  },
  updateCenterGps(state, centerGps) {
    state.center = centerGps
  },
  updateHubCode(state, hubCode) {
    state.hubCode = hubCode
  }
}
export default mutations
