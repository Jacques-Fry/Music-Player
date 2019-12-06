<template>
  <div class="home">
    <!-- 首页页面头部 -->
    <HomeTitle @search="searchMusic" />
    <!-- 页面主体 -->
    <div class="content">
      <!-- 页面左边 -->
      <HomeLeft class="home-left" />
      <!-- 页面中间 -->
      <HomeCenter class="home-center" :song-search="data.result" />
      <!-- 页面右边 -->
      <HomeRight class="home-right" />
    </div>
  </div>
</template>

<script>
import HomeTitle from "./childComps/HomeTitle";
import HomeLeft from "./childComps/HomeLeft";
import HomeCenter from "./childComps/HomeCenter";
import HomeRight from "./childComps/HomeRight";

import { search } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      keywords: "邓紫棋",
      offset: 0,
      limit: 20,
      data: {}
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
    searchMusic(keywords) {
      //搜索内容不重复
      if (keywords !== this.keywords) {
        //搜索
        this.keywords = keywords;
        this.search();
      }
    },
    search() {
      search(this.keywords, this.offset, this.limit).then(res => {
        // console.log(res)
        this.data = res;
      });
    }
  }
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
