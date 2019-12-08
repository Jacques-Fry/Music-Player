<template>
  <div class="home">
    <!-- 首页页面头部 -->
    <HomeTitle @search="searchMusic" />
    <!-- 页面主体 -->
    <div class="content">
      <!-- 页面左边 -->
      <HomeLeft class="home-left" :music-index="musicIndex"/>
      <!-- 页面中间 -->
      <HomeCenter
        ref="HomeCenter"
        class="home-center"
        :song-list="data.result"
        :loading="songsLoading"
        @query="queryMusic"
        @checkAll="checkAll"
      />
      <!-- 页面右边 -->
      <HomeRight
        ref="HomeRight"
        class="home-right"
        :comments-data="commentsData"
        @commentQuery="queryComment"
        :loading="commentsLoading"
      />

      <!-- 音乐播放器 -->
      <aplayer
        ref="aplayer"
        :audio="musicPlayingList"
        :lrcType="1"
        fixed
        @empetied="musicEmpetied"
        @error="musicError"
        @listSwitch="musicListSwitch"
      />
    </div>
  </div>
</template>

<script>
import HomeTitle from "./childComps/HomeTitle";
import HomeLeft from "./childComps/HomeLeft";
import HomeCenter from "./childComps/HomeCenter";
import HomeRight from "./childComps/HomeRight";

import { search, commentMusic } from "network/home.js";

import { MusicAPlayerMixIn } from "common/mixins.js";

export default {
  name: "Home",
  data() {
    return {
      keywords: "邓紫棋",
      songsOffset: 0,
      songsLimit: 20,
      commentsOffset: 0,
      commentsLimit: 20,
      //搜索数据
      data: {},
      //音乐页面加载特效是否开启
      songsLoading: false,
      //全选
      isChecked: false,
      //评论列表
      commentsData: {},
      //评论F页面加载特效是否开启
      commentsLoading: false
    };
  },
  components: {
    HomeTitle,
    HomeLeft,
    HomeCenter,
    HomeRight
  },
  created() {
    this.search();
  },
  mounted() {
    this.$toast.show("欢迎来到首页 ヾ(*´▽‘*)ﾉ");
  },
  methods: {
    //监听歌曲搜索
    searchMusic(keywords) {
      //搜索内容不重复
      if (keywords !== this.keywords) {
        //搜索
        this.keywords = keywords;
        //偏移量重置
        this.songsOffset = 0;

        //分页栏重置
        this.$refs.HomeCenter.currentPage = 1;

        this.search();
      }
    },
    //监听歌曲页数以及每页条数改变
    queryMusic(pageNo, pageSize) {
      this.songsOffset = (pageNo - 1) * pageSize;
      this.songsLimit = pageSize;

      this.search();
    },
    //监听全选
    checkAll(isCheck) {
      console.log(isCheck);
      this.data.result.songs.forEach(item => {
        item.checked = isCheck;
      });
    },
    //执行歌曲搜索
    search() {
      this.loading = true;
      search(this.keywords, this.songsOffset, this.songsLimit).then(res => {
        console.log(res);
        res.result.songs.forEach(item => {
          item.checked = false;
        });
        this.data = res;
        this.loading = false;
      });
    },
    //监听评论分页
    queryComment(pageNo) {
      this.commentsOffset = (pageNo - 1) * this.commentsLimit;
      this.commentMusic();
    },
    //搜索评论
    commentMusic() {
      this.commentsLoading = true;
      commentMusic(this.musicId, this.commentsOffset, this.commentsLimit).then(
        res => {
          console.log(res);
          this.commentsData = res;

          this.commentsLoading = false;
        }
      );
    }
  },
  mixins: [MusicAPlayerMixIn]
};
</script>

<style scoped>
.home {
  position: relative;
  overflow: hidden;

  width: 100vw;
  height: 100vh;
}
.content {
  display: flex;

  height: calc(100% - 100px);
}

.home-center {
  flex: 1;
}
</style>
