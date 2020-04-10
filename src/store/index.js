import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import mutations from "./mutations"
import actions from "./actions"
import getters from './getters'

import {
  randomColor
} from 'common/utils.js'

//创建state对象

const state = {
  //正在播放列表
  musicPlayingList: [
  ]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store