<template>
  <div class="home-title">
    <!-- Logo -->
    <div class="logo">
      <img src="~assets/img/logo.png" alt />
    </div>
    <!-- Title -->
    <div class="title">
      <span>Music</span>
    </div>
    <!-- Search -->
    <div class="search">
      <el-input class="search-input" v-model="keywords" placeholder="请输入搜索内容" @keyup.enter="search"/>
      <el-button class="search-button" type="warning" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <!-- User -->
    <div class="user">
      <div class="user-login">登录</div>
      <div class="user-spel">|</div>
      <div class="user-register">注册</div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "HomeTitle",
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    search() {
      if (this.keywords == null || this.keywords == "") {
        this.$toast.show("输入框是空的 ◔ ‸◔？");
      } else {
        this.$emit("search", this.keywords);
      }
    }
  }
};
</script>

<style scoped>
.home-title {
  position: relative;
  display: flex;

  width: 100%;
  height: 100px;

  background-color: rgb(7, 152, 248);
}
.logo {
  width: 100px;
}
.logo img {
  padding: 12.5px 15px;
  width: 75px;
  height: 75px;
}

.title {
  line-height: 100px;

  font-size: 30px;
  font-weight: 1000;

  color: #fff;
}
.search {
  position: relative;
  overflow: hidden;
  text-align: center;
  flex: 1;
  height: 100px;
  line-height: 100px;
}

.search-input {
  width: 300px;
  margin-right: 20px;
}

.user {
  display: flex;
  text-align: center;

  line-height: 100px;
  width: 200px;
}

.user-login,
.user-register {
  flex: 1;

  font-size: 20px;
  font-weight: 600;

  color: #fff;
}
.user-spel {
  font-size: 20px;
  font-weight: 600;

  color: #fff;
}
</style>
