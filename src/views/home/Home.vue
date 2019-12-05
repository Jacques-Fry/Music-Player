<template>
  <div class="home">
    <!-- 首页页面头部 -->
    <HomeTitle />
    <!-- 页面主体 -->
    <div class="content">
      <!-- 页面左边 -->
      <HomeLeft class="home-left" />
      <!-- 页面中间 -->
      <HomeCenter class="home-center" />
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

export default {
  name: "Home",
  components: {
    HomeTitle,
    HomeLeft,
    HomeCenter,
    HomeRight
  },
  mounted() {
    this.$toast.show("欢迎来到首页");
  }
};
</script>

<style scoped>
.home {
  position: relative;

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
