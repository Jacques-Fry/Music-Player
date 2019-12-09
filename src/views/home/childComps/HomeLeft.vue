<template>
  <div class="home-left">
    <div class="vue-scroll">
      <vue-scroll>
        <div class="content-collapse">
          <el-collapse v-model="activeName" accordion>
            <!-- <el-collapse-item>
          <template slot="title">我喜欢</template>
        </el-collapse-item>
        <el-collapse-item title="最近听过">
            </el-collapse-item>-->
            <el-collapse-item :title="musicPlayingListLength" name="1">
              <div
                class="song"
                v-for="(item,index) in musicPlayingList"
                :key="index"
                @dblclick="changeMusic(index)"
                :class="{active:musicIndex===index }"
              >
                <div class="song-button">
                  <!-- 播放中 -->
                  <i
                    v-if="musicIndex===index&&!$parent.musicPaused()"
                    class="el-icon-video-pause"
                    @click="musicPause"
                  ></i>
                  <!-- 未播放 -->
                  <i v-else class="el-icon-video-play" @click="changeMusic(index)"></i>
                </div>
                <div class="song-name" :title="item.name">{{item.name}}</div>

                <div class="song-artist" :title="item.artist">{{item.artist}}</div>
                <div class="song-delete" @click="removeSong(index)">X</div>
              </div>

              <div class="song-clear" @click="clearSong">清空此列表</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return { activeName: "1" };
  },
  props: {
    musicIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      musicPlayingList: "getMusicPlayingList",

      getMusicPlayingListLength: "getMusicPlayingListLength"
    }),
    musicPlayingListLength() {
      return "当前播放列表(" + this.getMusicPlayingListLength + ")";
    }
  },

  methods: {
    ...mapActions(["clearMusicPlaying"]),
    //移除音乐
    removeSong(index) {
      // console.log("移除---" + index);
      //发射事件
      this.$bus.$emit("delMusicPlayingOne", index);
    },
    //切换音乐
    changeMusic(index) {
      this.$bus.$emit("changeMusic", index);
    },
    //暂停音乐
    musicPause() {
      this.$bus.$emit("musicPause");
    },
    //清空列表
    clearSong() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "确定清空 "),
          h("span", { style: "color: red" }, "当前播放列表吗?")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            this.clearMusicPlaying([]).then(res => {
              instance.confirmButtonLoading = false;
              done();
              this.$toast.show(res);
            });
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.home-left {
  position: relative;

  width: 300px;
  height: 100%;

  /* border-right: 2px solid rgba(0, 0, 0, 0.05); */

  box-shadow: 2px 0 0 rgba(0, 0, 0, 0.1);
}

.vue-scroll {
  height: calc(100% - 112px);
}
.content-collapse {
  width: 298px;
}
.el-collapse-item {
  overflow: hidden;

  text-indent: 5px;

  /* background-color: rgba(255, 255, 255, 1); */
}

/* .el-collapse-item__header {
  background-color: rgba(0, 0, 0, 0) !important;
}
.el-collapse-item__content {
  padding-bottom: 0;
} */

.song {
  display: flex;

  height: 34px;
  line-height: 34px;
  font-weight: 600;

  color: rgb(117, 117, 117);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.song:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.song-button:hover {
  cursor: pointer;
}
.song-name {
  overflow: hidden;
  flex: 1;
}
.song-artist {
  overflow: hidden;
  padding-left: 5px;
  flex: 1;
}
.song-delete {
  width: 20px;

  color: rgba(41, 40, 40, 0.4);
}
.song-delete:hover {
  color: rgb(7, 152, 248);
}
.active {
  background-color: rgba(0, 0, 0, 0.1);
}
.song-clear {
  text-align: center;
  position: relative;
  top: 15px;
  cursor: pointer;

  font-weight: 600;

  color: #9c9c9c;
}

.song-clear:hover {
  color: #6d6d6d;
}
</style>
