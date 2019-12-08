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
      //当前播放musicID
      musicId: 1

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
  },
  methods: {
    ...mapActions(["addMusicPlaying", "delMusicPlaying"]),
    //监听添加音频
    addMusicPlayingOne(music) {
      // console.log(this.$refs.aplayer.currentMusic);
      this.musicId = music.id
      //重新渲染评论
      this.$refs.HomeRight.currentPage = 1
      this.commentsOffset = 0
      this.commentMusic()
      //添加至列表
      this.addMusicPlaying(music).then(res => {
        this.$toast.show(res);
        //切换播放
        this.$refs.aplayer.switch(this.musicPlayingListLength - 1);
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
      // if(if()){
      //   //渲染评论
      // }
      this.$refs.aplayer.switch(index);
      //重新渲染评论
    },
    //获取当前播放下标
    musicListSwitch() {
      this.musicId = this.$refs.aplayer.currentMusic.id;
      this.musicIndex = this.musicPlayingList.findIndex(item => {
        if (item.id === this.musicId) return true;
      });
    },
    //音乐播放错误
    musicEmpetied() {
      this.$toast.show("音乐文件故障");
    },
    //音乐加载异常
    musicError() {
      console.log("音乐加载异常");
    }
  },
  beforeDestroy() {
    this.$bus.$off("vaPage"); //当这个组件销毁的时候bus也跟着一起销毁
  }
}