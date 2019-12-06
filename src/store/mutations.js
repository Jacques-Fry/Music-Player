import { ADD_MUSIC_PLAYING, DEL_MUSIC_PLAYING, ADD_MUSIC_LOVE, DEL_MUSIC_LOVE, ADD_MUSIC_HISTORY, DEL_MUSIC_HISTORY } from "./mutation-types"

export default {
  [ADD_MUSIC_PLAYING](state, payLoad) {
    state.musicPlayingList.push(payLoad);
  },
  [DEL_MUSIC_PLAYING](state, payLoad) {
    state.musicPlayingList = payLoad
  },
  [ADD_MUSIC_LOVE]() {

  },
  [DEL_MUSIC_LOVE]() {

  },
  [ADD_MUSIC_HISTORY]() {

  },
  [DEL_MUSIC_HISTORY]() {

  }
}