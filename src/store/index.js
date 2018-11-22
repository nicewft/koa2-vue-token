import Vue from 'vue'
import Vuex from 'vuex'
import cookie from '../utils/common'
import mutations from './mutations'
import * as getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
  token: '' || cookie.get('token')
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store