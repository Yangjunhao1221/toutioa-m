<template>
  <div class="history">
    <van-cell title="搜索历史" :border="false" class="first-search">
      <div v-if="deletebtn">
        <span @click="$emit('allDelete')">全部删除</span>
        <span @click="deletebtn = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="deletebtn = true" />
    </van-cell>

    <van-cell
      v-for="(item, index) in search_text"
      :key="index"
      :title="item"
      :border="false"
      @click="deleteSearchHistory(index, item)"
    >
      <van-icon name="close" v-if="deletebtn" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    search_text: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      deletebtn: false,
    };
  },
  methods: {
    deleteSearchHistory(index, item) {
      if (this.deletebtn) {
        // 删除操作
        this.search_text.splice(index, 1);
      } else {
        //去详情页
        this.$emit("searchHistory", item);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.history {
  .first-search {
    display: flex;
    .van-cell__title {
      flex: 1 !important;
    }
    .van-cell__value {
      flex: 1 !important;
      span {
        padding: 0 5px;
      }
    }
  }
  .van-cell {
    .van-cell__title {
      flex: 16;
    }
    .van-cell__value {
      flex: 1;
    }
  }
}
</style>