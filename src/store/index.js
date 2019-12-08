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
  musicPlayingList: [{
      id: 1,
      name: "句号",
      artist: "G.E.M.邓紫棋",
      url: "http://6s.net579.com:24630/file/mp3/juhao.mp3",
      cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575813592646&di=a138c286d145a503d62af8ebb1cab74d&imgtype=0&src=http%3A%2F%2Fimage11.m1905.cn%2Fuploadfile%2F2019%2Fss%2F1122%2F20191122113010488.jpg",
      theme: randomColor(),
      lrc: ''
    },
    {
      id: 2,
      name: "咏春",
      artist: "李宇春",
      url: "http://6s.net579.com:24630/file/mp3/yongcun.mp3",
      cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575813639937&di=876dba795027a394bcd8acf820f2a841&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20191206%2Fc2d58ac0a82c40278fff75ca918742db.jpg",
      theme: randomColor(),
      lrc: ''
    }
  ]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store