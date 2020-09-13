import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import modules from './modules'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// TODO: Add this plugin back when we need multiple pages
// const plugins = [createPersistedState()]
const plugins = []
if (debug) {
  plugins.push(createLogger())
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  strict: debug,
  plugins
})
