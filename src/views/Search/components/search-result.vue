<template>
  <div class="Suggestion">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :border="false"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from "@/api";
export default {
  name: "searchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      //  1.发起请求
      try {
        const { data } = await getSearchResultAPI({
          page: this.page, //页数
          per_page: 20, //每页数量
          q: this.searchText, //搜索关键字
        });
        // 2.将结果存入数组
        const { results } = data.data;
        // console.log(results);
        this.list.push(...results);
        // 3.关闭loading状态
        this.loading = false;
        // 模拟错误
        // if (Math.random() > 0.9) {
        //   JSON.parse("2112");
        // }
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log(1);
        //提示报错
        this.error = true;
        // 加载失败也要停掉loading
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>