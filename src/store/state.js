const state = {
  showMenu: true,
  areaCodeForSelect: localStorage.getItem('defaultAreaCode') || '',
  areaCodeListForSelect: [],
  companyIdForSelect: '',
  companyListForSelect: [],
  terminalList: [],
  center: [116.393045, 39.910449] // 北京
}
export default state
