import {
  get,
  END_POINTS
} from '@/api'
import { accountMgmt, watchDutySchedule, tripTrail, anomaly, trafficFlow, focus } from '@/constant/menu'

const state = {
  homePage: '/login',
  homePageMenuKey: '',
  hasGetRules: false,
  activePath: '',
  resourceList: [],
  showMenu: true,
  subMenu: [],
  mainMenu: [],
  openNamesFromMain: '',
  focusRule: false
}

const actions = {
  async getResourceListByRole({
    commit
  }) {
    const resourceListObject = await get(END_POINTS.GET_RESOURCE_LIST_BY_ROLE + `?userId=` + localStorage.getItem('userId'))
    if (resourceListObject.success) {
      // 生成菜单
      commit('updateResourceList', resourceListObject.data)
    }
    return true
  }
}

const mutations = {
  updateHomePage(state, homePage) {
    state.homePage = homePage
  },
  updateHasRule(state, hasRule) {
    state.hasGetRules = hasRule
  },
  updateActivePath(state, url) {
    state.activePath = url
  },
  updateResourceList(state, menuList) {
    // 已经获取到权限菜单
    state.hasGetRules = true
    state.focusRule = menuList.some(menu => menu.permission === 'vehicleFocusManage')
    const mainMenu = menuList.filter(menu => menu.resourceKey)
    state.mainMenu = mainMenu
    const firstMenu = mainMenu[0].resourceKey
    const allSubMenu = {
      accountMgmt,
      watchDutySchedule,
      tripTrail,
      anomaly,
      trafficFlow,
      focus
    }
    const subMenu = allSubMenu[firstMenu][0]
    state.homePageMenuKey = subMenu.name
    state.homePage = subMenu.path
  },
  updateShowMenu(state, value) {
    state.showMenu = value
  },
  updateSubMenu(state, value) {
    state.subMenu = value
  },
  updateOpenNamesFromMain(state, value) {
    state.openNamesFromMain = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
