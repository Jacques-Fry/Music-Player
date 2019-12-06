import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import mutations from "./mutations"
import actions from "./actions"
import getters from './getters'

//创建state对象
const state = {
  musicPlayingList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store