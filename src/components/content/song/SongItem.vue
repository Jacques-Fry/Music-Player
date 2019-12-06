<template>
  <div class="song" @dblclick="addMusic">
    <div class="song-checkbox" @click="checked">
      <el-checkbox :disabled="!isAvailable" />
    </div>
    <div class="song-name">{{song.name}}</div>
    <div class="song-artists">{{artists}}</div>
    <div class="song-duration">{{song.duration|formatDate}}</div>
  </div>
</template>

<script type="text/javascript">
import { checkMusic } from "network/home.js";
import { formatDate } from "common/utils";

export default {
  name: "SongItem",
  data() {
    return {
      isAvailable: true
    };
  },
  props: {
    song: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    //歌手
    artists() {
      return this.song.artists.reduce((preValue, item) => {
        preValue = preValue && preValue + " & ";
        return preValue + " " + item.name;
      }, "");
    }
  },
  mounted() {
    //音乐是否可用
    checkMusic(this.song.id).then(res => {
      this.isAvailable = res.success;
    });
  },
  methods: {
    checked() {},
    addMusic() {
      console.log("添加音乐");
    }
  },
  filters: {
    formatDate(time) {
      return formatDate(new Date(time), "mm : ss");
    }
  }
};
</script>

<style scoped>
.song {
  display: flex;

  width: 100%;
  height: 50px;
  line-height: 50px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.song-checkbox {
  width: 90px;
  padding-left: 5px;
  text-align: center;
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
</style>
