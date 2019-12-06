import { ADD_MUSIC_PLAYING, DEL_MUSIC_PLAYING, ADD_MUSIC_LOVE, DEL_MUSIC_LOVE, ADD_MUSIC_HISTORY, DEL_MUSIC_HISTORY } from "./mutation-types"

export default {

  //添加一首音乐至播放列表
  addMusicPlaying({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      //查找之前是否添加过此音乐
      const oldProduct = state.musicPlayingList.find(item => item.id === payLoad.id)
      if (oldProduct) {
        resolve("列表已存在该音乐")
      } else {
        commit(ADD_MUSIC_PLAYING, payLoad)
        resolve("已添加该音乐至播放列表")
      }
    })

  },
  //删除播放列表一首音乐
  delMusicPlaying({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      commit(DEL_MUSIC_PLAYING, state.cartList.filter(item => item.id!==payLoad))
      console.log(payLoad)
      resolve("删除成功")
    })
  }
}