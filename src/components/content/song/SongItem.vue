  <template>
  <div class="song" @dblclick="addMusic">
    <div class="song-checkbox">
      <el-checkbox v-model="song.checked" />
      {{song.checked|checkFilter}}
    </div>
    <div class="song-name">{{song.name}}</div>
    <div class="song-artists">{{artists}}</div>
    <div class="song-duration">{{song.duration|formatDate}}</div>
  </div>
</template>

<script type="text/javascript">
import { songUrl, lyric, songDetail } from "network/home.js";
import { formatDate } from "common/utils";

import { mapActions } from "vuex";

export default {
  name: "SongItem",
  data() {
    return {
      isAvailable: true,
      music: {}
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
    // console.log(this.song);
  },
  methods: {
    ...mapActions(["addMusicPlaying"]),
    boxCheck() {
      console.log(11);
    },
    addMusic() {
      console.log("添加音乐");
      // 获取歌曲url
      songUrl(this.song.id)
        .then(res => {
          // console.log(res);
          if (res.data[0].url === null) {
            this.$toast.show("找不到该音乐url,可能没版权 ╮（╯＿╰）╭");
            return;
          }
          //整理数据
          this.music = {
            id: this.song.id,
            name: this.song.name,
            artist: this.artists,
            url: res.data[0].url
          };
          //获取歌词
          return lyric(this.song.id);
        })
        .then(res => {
          if (!res) return;
          this.music.lrc = res.lrc.lyric;
          // 获取详情
          return songDetail(this.song.id);
        })
        .then(res => {
           if (!res) return;
          //得到图片url
          this.music.cover = res.songs[0].al.picUrl;
          // 发射事件切换歌曲
          this.$bus.$emit("musicChange", this.music);
          //添加至列表
          this.addMusicPlaying(this.music).then(res => {
            this.$toast.show(res);
          });
        });
    }
  },
  filters: {
    formatDate(time) {
      //格式化
      return formatDate(new Date(time), "mm:ss");
    },
    checkFilter(check) {
      return check ? "已选" : "";
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
.song:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.song-checkbox {
  text-align: center;

  width: 90px;
  padding-left: 5px;
  font-size: 14px;

  color: rgba(7, 152, 248);
}
.song-name {
  flex: 1;
  overflow: hidden;
}
.song-artists {
  flex: 1;
  overflow: hidden;
}
.song-duration {
  width: 80px;
  overflow: hidden;
}
</style>
