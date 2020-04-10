<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style>
@import "assets/css/base.css";
#app {
  /*   
  background: url(~assets/img/topbar01.jpg) no-repeat;
  background-size: cover; */
}
#app {
  position: relative;
  height: 100%;
  min-height: 100vh;
  max-width: 100vw;
  min-width: 1250px;
}
</style>
