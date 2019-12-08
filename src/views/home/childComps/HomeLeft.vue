<template>
  <div class="home-left">
    <vue-scroll class="vue-scroll">
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
              <div class="song-name" :title="item.name">{{item.name}}</div>

              <div class="song-artist" :title="item.artist">{{item.artist}}</div>
              <div class="song-delete" @click="removeSong(index)">X</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </vue-scroll>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

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
      return "当前列表(" + this.getMusicPlayingListLength + ")";
    }
  },

  methods: {
    //移除音乐
    removeSong(index) {
      console.log("移除---" + index);
      //发射事件
      this.$bus.$emit("delMusicPlayingOne", index);
    },
    //切换音乐
    changeMusic(index) {
      this.$bus.$emit("changeMusic", index);
    }
  },
  components: {}
};
</script>

<style scoped>
.home-left {
  position: relative;

  width: 300px;
  height: calc(100%);

  /* border-right: 2px solid rgba(0, 0, 0, 0.05); */

  box-shadow: 2px 0 0 rgba(0, 0, 0, 0.1);
}

.vue-scroll {
  height: calc(100% - 100px);
}
.content-collapse {
  width: 298px;
}
.el-collapse-item {
  overflow: hidden;

  padding-left: 5px;
  background-color: rgba(255, 255, 255, 1);
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
</style>
