<template>
  <div id="app">
    <div id="nav"></div>

    <router-view />
    <!-- 音乐播放器 -->
    <aplayer :audio="audio" :lrcType="0" fixed />
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      audio: []
    };
  },
  mounted() {
    this.audio = [
      {
        name: "东西（Cover：林俊呈）",
        artist: "纳豆",
        url: "https://cdn.moefe.org/music/mp3/thing.mp3",
        cover:
          "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300",
        lrc: "https://cdn.moefe.org/music/lrc/thing.lrc",
        theme: this.randomColor()
      },
      {
        name: "寂寞星球的玫瑰",
        artist: "G.E.M. 邓紫棋",
        url:
          "http://m7.music.126.net/20191205151707/7060f2e5cb40385c487599c1ef1251c4/ymusic/be29/593a/20a4/263eb267fb96290471bc33d1cef2e374.mp3",
        cover:
          "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        theme: this.randomColor()
      },
      {
        name: "响喜乱舞（Cover：MARiA）",
        artist: "泠鸢yousa",
        url: "https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3",
        cover:
          "https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300",
        lrc: "https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc",
        theme: this.randomColor()
      }
    ];
  },
  methods: {
    randomColor() {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    }
  }
};
</script>
<style>
@import "assets/css/base.css";
</style>
