import {
  get,
  END_POINTS
} from '@/api'
import { lawSupervising, areaManage, commonService, systemManage } from '@/router/routerMap'

const state = {
  homePage: '/login',
  homePageMenuKey: '',
  hasGetRules: false,
  activePath: '',
  resourceList: [],
  showMenu: true,
  subMenu: [],
  subMenuObj: {},
  mainMenu: [],
  openNamesFromMain: '',
  focusRule: false
}

const actions = {
  async getResourceListByRole({
    commit
  }) {
    const resourceListObject = await get(END_POINTS.GET_RESOURCE_LIST_BY_ROLE + `?userId=` + localStorage.getItem('userId') + '&resourceType=HUB_MANAGE')
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
    state.focusRule = menuList.twoLevelResourceList.some(menu => menu.resourceName === '关注车辆')
    const mainMenu = menuList.oneLevelResourceList.filter(menu => menu.resourceKey)
    const subMenu = menuList.twoLevelResourceList
    const subMenuObj = {}
    const allSubMenu = {
      lawSupervising,
      areaManage,
      commonService,
      systemManage
    }
    mainMenu.forEach(item => {
      subMenuObj[item.resourceKey] = allSubMenu[item.resourceKey].filter(subMenuItem => {
        const subMenuAvl = subMenu.filter(menu => menu.parentId === item.id)
        return subMenuAvl.some(subMenuAvlItem => subMenuAvlItem.resourceName === subMenuItem.name)
      })
    })
    state.mainMenu = mainMenu
    state.subMenuObj = subMenuObj
    const firstMenu = mainMenu[0].resourceKey
    state.subMenu = allSubMenu[firstMenu]
    const homePage = allSubMenu[firstMenu][0]
    state.homePageMenuKey = homePage.name
    state.homePage = homePage.path
    state.activePath = homePage.path
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
