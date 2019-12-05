<template>
  <div class="home-center">
    <!-- 内容 -->
    <div class="content"></div>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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

export default {
  data() {
    return {
      //总条数
      total: 400,
      //搜索页
      currentPage: 1,
      //每页个数
      pageSize: 20,
      audio: {
        name: "响喜乱舞（Cover：MARiA）",
        artist: "泠鸢yousa",
        url: "https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3",
        cover: 'https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300', // prettier-ignore
        lrc: "https://cdn.moefe.org/music/lrc/kyoukiranbu.lrc"
      }
    };
  },
  components: {
    APlayer
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
.content {
  height: calc(100% - 192px);
}

.block {
  border-top: 2px solid rgba(0, 0, 0, 0.1);

  padding-top: 10px;
}

.el-pagination {
  text-align: center;
}
</style>
