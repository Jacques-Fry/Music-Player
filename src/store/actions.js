import { ADD_MUSIC_PLAYING, DEL_MUSIC_PLAYING, CLEAR_MUSIC_PLAYING, ADD_MUSIC_LOVE, DEL_MUSIC_LOVE, ADD_MUSIC_HISTORY, DEL_MUSIC_HISTORY } from "./mutation-types"

export default {

  //添加一首音乐至播放列表
  addMusicPlaying({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      //查找之前是否添加过此音乐
      const oldProduct = state.musicPlayingList.find(item => item.id === payLoad.id)
      if (oldProduct) {
        resolve()
      } else {
        commit(ADD_MUSIC_PLAYING, payLoad)
        resolve("已添加该音乐至播放列表")
      }
    })

  },
  //删除播放列表一首音乐
  delMusicPlaying({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      if (state.musicPlayingList.length <= 1) {
        resolve("删除失败，至少保留一首")
      } else {
        commit(DEL_MUSIC_PLAYING, payLoad)
        resolve("删除成功")
      }
    })
  },
  //清空列表
  clearMusicPlaying({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
      commit(CLEAR_MUSIC_PLAYING, payLoad)
      resolve("已清空，至少保留一首歌")
    })
  }
}