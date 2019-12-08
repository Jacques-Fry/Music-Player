<template>
  <div class="home">
    <!-- 首页页面头部 -->
    <HomeTitle @search="searchMusic" />
    <!-- 页面主体 -->
    <div class="content">
      <!-- 页面左边 -->
      <HomeLeft class="home-left" />
      <!-- 页面中间 -->
      <HomeCenter
        ref="HomeCenter"
        class="home-center"
        :song-list="data.result"
        :loading="loading"
        @query="queryMusic"
        @checkAll="checkAll"
      />
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
      data: {},
      loading: false,
      isChecked: false
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
    //监听搜索
    searchMusic(keywords) {
      //搜索内容不重复
      if (keywords !== this.keywords) {
        //搜索
        this.keywords = keywords;
        //偏移量重置
        this.offset = 0;

        //分页栏重置
        this.$refs.HomeCenter.currentPage = 1;

        this.search();
      }
    },
    //监听页数以及每页条数改变
    queryMusic(pageNo, pageSize) {
      this.offset = (pageNo - 1) * pageSize;
      this.limit = pageSize;

      this.search();
    },
    //监听全选
    checkAll(isCheck) {
      console.log(isCheck);
      this.data.result.songs.forEach(item => {
        item.checked = isCheck;
      });
    },
    //执行搜索
    search() {
      this.loading = true;
      search(this.keywords, this.offset, this.limit).then(res => {
        console.log(res);
        res.result.songs.forEach(item => {
          item.checked = false;
        });
        this.data = res;
        this.loading = false;
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
