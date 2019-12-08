<template>
  <div class="home-left">
    <!-- 头 -->
    <div class="title">评论</div>

    <!-- 内容 -->
    <div
      class="content"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <vue-scroll class="vue-scroll">
        <div v-if="Object.keys(commentsData).length !== 0">
          <div class="comment" v-for="(item,index) in commentsData.comments" :key="index">
            <div class="comment-information">
              <div class="user-head-portrait">
                <el-image
                  style="width: 32px; height: 32px;border-radius: 50%;"
                  :src="item.user.avatarUrl"
                ></el-image>
              </div>
              <div class="user-information">
                <p>{{item.user.nickname}}</p>
                <p style="font-size:12px;">{{item.time|formatDate}}</p>
              </div>
            </div>
            <div class="user-content">{{item.content}}</div>
          </div>
        </div>

        <div class="prompt">当前没有数据 (/= _ =)/~┴┴</div>
      </vue-scroll>
    </div>

    <!-- 分页 -->
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        small
        layout="prev, pager, next"
        :total="commentsData.total"
        :current-page="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import { formatDate } from "common/utils";

export default {
  data() {
    return {
      currentPage: 1
    };
  },
  props: {
    commentsData: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      //发射事件
      this.$emit("commentQuery", this.currentPage);
    }
  },
  filters: {
    formatDate(time) {
      //格式化
      return formatDate(new Date(time), "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style scoped>
.home-left {
  overflow: hidden;
  position: relative;

  width: 300px;
  height: 100%;
  box-shadow: -2px 0 rgba(0, 0, 0, 0.1);
}
.title {
  line-height: 50px;
  text-indent: 1em;

  font-weight: 600;

  box-shadow: 0 2px rgba(0, 0, 0, 0.1);
}
.content {
  position: relative;
  overflow: hidden;

  height: calc(100% - 120px);
  width: 300px;
  margin: 0 5px;
}
.vue-scroll {
  height: 100%;
}
.comment {
  padding: 10px 0;
}
.comment-information {
  display: flex;
}
.user-head-portrait {
  width: 32px;
  height: 32px;
}
.user-information {
  overflow: hidden;

  height: 32px;
  margin-left: 5px;
  font-size: 16px;
}
.user-content {
  text-align: justify;
  /* font-style: italic; */

  margin: 5px 20px 0 37px;
  font-size: 13px;
}

.bottom {
  text-align: center;
}

.prompt {
  text-align: center;
  line-height: 50px;

  font-size: 14px;
}
</style>
