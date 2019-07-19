import {
  get,
  END_POINTS
} from '@/api'
import { routerCommon } from '@/router/router'
import routerMap from '@/router/routerMap'

const state = {
  homePage: '/',
  homePageMenuKey: '',
  hasGetRules: false,
  activePath: '',
  resourceList: [],
  showMenu: true,
  subMenu: []
}

const getAccesRouterList = (routerMap, rules) => {
  let newRouter = []
  routerMap.forEach(map => {
    rules.forEach(rule => {
      if (map.name === rule.menuKey) {
        map['path'] = rule.url
        map.meta.title = rule.name
        newRouter.push(map)
      }
    })
  })
  return newRouter
}

const actions = {
  async getResourceList ({
    commit
  }) {
    const resourceListObject = await get(END_POINTS.GET_RESOURCE_LIST + `?userId=` + localStorage.getItem('userId'))
    console.log(resourceListObject)
    // 将匹配到的路由拼接到子路由中，返回所有匹配到的路由
    const routerList = getAccesRouterList(routerMap, resourceListObject.data.twoLevelResourceList)
    const routerCommonChild = routerCommon.children.concat(routerList)
    routerCommon.children = routerCommonChild
    if (resourceListObject.success) {
      // 生成菜单
      commit('updateResourceList', { serverMenu: resourceListObject.data, routerCommonChild })
    }
    return routerCommon
  }
}

const mutations = {
  updateHomePage (state, homePage) {
    state.homePage = homePage
  },
  updateHasRule (state, hasRule) {
    state.hasGetRules = hasRule
  },
  updateActivePath (state, url) {
    state.activePath = url
  },
  updateResourceList (state, { serverMenu, routerCommonChild }) {
    // 已经获取到权限菜单
    state.hasGetRules = true
    let oneLevelResourceList = serverMenu.oneLevelResourceList
    // 服务端返回大量不存在的二级页面，需要过滤
    let twoLevelResourceList = serverMenu.twoLevelResourceList.filter(menu => {
      return routerCommonChild.find(router => router.name === menu.menuKey)
    })
    // 循环一二级菜单，构造侧边栏菜单树的结构
    let newOneLevelResource = []
    oneLevelResourceList.forEach(value => {
      if (value.menuKey) {
        let children = []
        twoLevelResourceList.forEach(valueTwo => {
          const path = routerCommonChild.find(router => router.name === valueTwo.menuKey).path
          if (valueTwo.menuKey === 'Notification') { // 有消息推送菜单才显示按钮
            state.isShowMessagePustBtn = true
          }
          if (valueTwo.parentId === value.id) {
            children.push({
              id: valueTwo.id,
              name: valueTwo.name,
              url: path,
              menuKey: valueTwo.menuKey
            })
          }
        })
        value['children'] = children
        newOneLevelResource.push(value)
      }
    })
    let homePageMenuKey = newOneLevelResource[0].children[0].menuKey
    state.homePageMenuKey = homePageMenuKey
    state.homePage = routerCommonChild.find(router => router.name === homePageMenuKey).path
    state.resourceList = newOneLevelResource
  },
  updateShowMenu (state, value) {
    state.showMenu = value
  },
  updateSubMenu (state, value) {
    state.subMenu = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
