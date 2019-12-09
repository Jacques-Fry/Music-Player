<template>
  <div class="home-center">
    <!-- 操作 -->
    <div class="option">
      <div class="song-select-count">
        已选
        <span>{{isSelectCount}}</span> 首
      </div>
      <div class="add-to-playing-list">
        <el-button
          :disabled="isSelectCount===0"
          type="primary"
          icon="el-icon-plus"
          @click="addToMusicPlayingList"
        >添加至播放列表</el-button>
      </div>
    </div>
    <!-- 头部 -->
    <div class="title">
      <div class="song-checkbox">
        <el-checkbox v-model="isCheck" @click.native="boxCheck"></el-checkbox>&nbsp;多选
      </div>
      <div class="song-button"></div>
      <div class="song-name">歌曲</div>
      <div class="song-artists">歌手</div>
      <div class="song-duration">时长</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <vue-scroll
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <HomeCenterSongItem
          v-for="(item, index) in songList.songs"
          :key="index"
          :song="item"
          :musicNowId="$parent.musicNowId"
          :musicPaused="$parent.musicPaused()"
        />
      </vue-scroll>
    </div>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="songList.songCount"
      ></el-pagination>
    </div>

    <!-- 播放器 -->
    <div>
      <!-- <aplayer ref="aplayer" :audio="audio" :lrcType="1" /> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import HomeCenterSongItem from "./HomeCenterSongItem";

import { songUrl, lyric } from "network/home.js";

export default {
  data() {
    return {
      //总条数
      total: 400,
      //搜索页
      currentPage: 1,
      //每页个数
      pageSize: 20,
      //当前播放
      audio: {
        name: "",
        artist: "",
        url: "",
        cover: '', // prettier-ignore
        lrc: ""
      },
      isCheck: false
    };
  },
  props: {
    songList: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    // console.log(this.songList);
    //监听选择音乐临时播放
    // this.$bus.$on("musicChange", this.musicChange);
  },
  components: {
    HomeCenterSongItem
  },

  computed: {
    isSelectCount() {
      if (!this.songList.songs || this.songList.songs.length === 0)
        return false;
      // console.log(!this.songList.songs.find(item => !item.checked));
      return this.songList.songs.filter(item => item.checked).length;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      //发射事件
      this.$emit("query", this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //发射事件
      this.$emit("query", this.currentPage, this.pageSize);
    },
    musicChange(music) {
      //接受music数据
      this.audio = music;
      //播放
      // this.$nextTick(() => {
      // this.$refs.aplayer.play();
      // });
    },
    //全选
    boxCheck() {
      const isCheck = this.isCheck;
      this.$emit("checkAll", !isCheck);
    },
    //添加多个音乐至播放列表
    addToMusicPlayingList() {
      this.$toast.show("功能开发中");
    }
  },
  beforDestroy() {
    this.$bus.$off("vaPage"); //当这个组件销毁的时候bus也跟着一起销毁
  }
};
</script>

<style scoped>
.home-center {
  position: relative;

  height: 100%;
}
.option {
  display: flex;

  line-height: 50px;
}
.song-select-count {
  width: 80px;
  padding: 0 20px;
}
.song-select-count span {
  color: #0798f8;
}
.add-to-playing-list {
  padding: 0 20px;
}
.title {
  display: flex;

  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 600;

  /* box-shadow: -1px -3px rgba(0, 0, 0, 0.05); */
  /* background-color: rgb(7, 152, 248); */
  color: #fff;
  background: url(~assets/img/topbar01.jpg) left top no-repeat;
  background-size: cover;
  /* box-shadow:  0 0 2px #000; */
}
.song-checkbox {
  text-align: center;

  width: 70px;
  padding-left: 5px;
  font-size: 14px;
}
.song-button {
  width: 30px;
}
.song-name {
  flex: 1;
}
.song-artists {
  flex: 1;
}
.song-duration {
  width: 80px;
}

.content {
  overflow-x: hidden;
  overflow-y: auto;

  height: calc(100% - 212px);
  margin-bottom: 5px;

  background: url(~assets/img/topbar01.jpg) no-repeat;
  background-size: cover;

  color: #fff;

  /* box-shadow: #666 0px 0px 5px inset; */
}

.block {
  padding-top: 10px;
  box-shadow: 0px -5px rgba(0, 0, 0, 0.05);
}

.el-pagination {
  text-align: center;
}
</style>
