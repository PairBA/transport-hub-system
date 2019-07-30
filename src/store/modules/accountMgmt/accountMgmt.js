import {
  get,
  END_POINTS
} from '@/api'
const state = {
  userName: '',
  roleId: '',
  userList: [],
  roleList: []
}
const actions = {
  async getUserList({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_USER_LIST, {
      userName: state.userName,
      roleId: state.roleId,
      hubCode: localStorage.getItem('hubCode')
    })
    commit('updateUserList', result)
  },
  async getRoleList({
    commit,
    state
  }) {
    const result = await get(END_POINTS.GET_ROLE_LIST)
    commit('updateRoleList', result)
  }
}
const mutations = {
  updateUserName(state, value) {
    state.userName = value
  },
  updateRoleId(state, value) {
    state.roleId = value
  },
  updateUserList(state, value) {
    if (value.code === 2000) state.userList = value.data
    else state.userList = []
  },
  updateRoleList(state, value) {
    if (value.code === 2000) state.roleList = value.data
    else state.roleList = []
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
