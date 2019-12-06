<template>
  <div class="home-center">
    <!-- 头部 -->
    <div class="title">
      <div class="song-checkbox">
        <el-checkbox></el-checkbox>全选
      </div>
      <div class="song-name">歌曲</div>
      <div class="song-artists">歌手</div>
      <div class="song-duration">时长</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <Song :songs="songSearch.songs" />
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
        :total="songSearch.songCount"
      ></el-pagination>
    </div>

    <!-- 播放器 -->
    <div>
      <aplayer :audio="audio" :lrcType="3" :listFolded="true" />
    </div>
  </div>
</template>

<script type="text/javascript">
import APlayer from "@moefe/vue-aplayer";

import Song from "components/content/song/Song";

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
        name: "响喜乱舞（Cover：MARiA）",
        artist: "泠鸢yousa",
        url: "https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3",
        cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
        lrc: "https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc"
      }
    };
  },
  props: {
    songSearch: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    APlayer,
    Song
  },
  mounted() {
    // console.log(this.songSearch);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.home-center {
  position: relative;

  height: 100%;
}
.title {
  display: flex;

  width: 100%;
  height: 50px;
  line-height: 50px;

  box-shadow: -1px -3px rgba(0, 0, 0, 0.05);
  background-color: rgb(7, 152, 248);
  color: #fff;
}
.song-checkbox {
  text-align: center;

  width: 90px;
  padding-left: 5px;
}
.song-name {
  flex: 1;
}
.song-artists {
  flex: 1;
}
.song-duration {
  width: 95px;
}

.content {
  overflow-x: hidden;
  overflow-y: auto;

  height: calc(100% - 202px);
  margin-bottom: 5px;

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
