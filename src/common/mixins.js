import {
  mapActions,
  mapGetters
} from "vuex";
import {
  commentMusic
} from "network/home.js";
/**
 * 混入的使用
 */

//音乐播放器
export const MusicAPlayerMixIn = {
  data() {
    return {
      //当前播放下标
      musicIndex: 0,
      //当前查看评论musicID
      musicId: 0,
      //当前播放音乐id
      musicNowId: 0

    };
  },
  computed: {
    ...mapGetters({
      musicPlayingList: "getMusicPlayingList",
      musicPlayingListLength: "getMusicPlayingListLength"
    })
  },
  mounted() {
    //监听全局添加音乐至播放列表事件
    this.$bus.$on("addMusicPlayingOne", this.addMusicPlayingOne);
    //监听全局删除正在播放音乐列表音乐
    this.$bus.$on("delMusicPlayingOne", this.delMusicPlayingOne);
    //监听全局音乐切换
    this.$bus.$on("changeMusic", this.musicChange);
    //监听全局音乐暂停
    this.$bus.$on("musicPause", this.musicPause);
  },
  methods: {
    ...mapActions(["addMusicPlaying", "delMusicPlaying"]),
    //监听添加音频
    addMusicPlayingOne(music) {
      console.log(music)
      console.log(222)
      // console.log(this.$refs.aplayer.currentMusic);
      this.musicId = music.id
      //重新渲染评论
      this.$refs.HomeRight.currentPage = 1
      this.commentsOffset = 0
      this.commentMusic()
      //添加至列表
      this.addMusicPlaying(music).then(res => {
        if (res) {
          this.$toast.show(res)

        }
        //切换播放
        this.$refs.aplayer.switch(this.musicPlayingList.findIndex(item => {
          if (item.id === music.id) return true;
        }));
        
        this.$refs.aplayer.toggle()

      });
    },
    //监听删除音频
    delMusicPlayingOne(index) {
      this.delMusicPlaying(index).then(res => {
        this.$toast.show(res);
      });
    },
    //监听切换播放
    musicChange(index) {

      if (this.musicId > 100) {
        //重新渲染评论
        this.$refs.HomeRight.currentPage = 1
        this.commentsOffset = 0
        this.commentMusic()
      }
      if ((index === 0 || index) && this.musicIndex !== index) {
        this.$refs.aplayer.switch(index);
      }
      this.$refs.aplayer.toggle()

    },
    //实时获取当前播放下标
    musicListSwitch() {
      this.musicNowId = this.$refs.aplayer.currentMusic.id;
      this.musicIndex = this.musicPlayingList.findIndex(item => {
        if (item.id === this.musicNowId) return true;
      });
    },
    //获取当前音乐播放状态
    musicPaused() {
      return !this.$refs.aplayer || this.$refs.aplayer.media.paused
    },
    //音乐暂停
    musicPause() {

      this.$refs.aplayer.pause()
    },
    //音乐播放错误
    musicEmpetied() {
      this.$toast.show("音乐文件故障");
    },
    //音乐加载异常
    musicError() {
      this.$toast.show("音乐加载异常");
    }
  },
  beforeDestroy() {
    this.$bus.$off("vaPage"); //当这个组件销毁的时候bus也跟着一起销毁
  }
}