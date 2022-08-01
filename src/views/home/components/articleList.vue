<template>
  <div class="atricleList">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="sunccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <AtricleItem
          v-for="(items, index) in list"
          :key="index"
          :article="items"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from "@/api";
import AtricleItem from "@/components/articleItem.vue";
export default {
  name: "articleList",
  props: {
    channels: {
      type: Object,
      required: true,
      timestamp: null,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, //请求失败提示
      isLoading: false, //下拉刷新状态
      sunccessText: "刷新成功",
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticleAPI({
          channel_id: this.channels.id, //频道id
          timestamp: this.timestamp || 1556789000001, //首次请求时间为（当前时间戳，因为数据问题所以把时间戳写死了），
          with_top: 0, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // 模拟请求发生错误
        // if (Math.random() > 0.5) {
        //   JSON.parse("adsad1");
        // }
        this.list.push(...data.data.results);
        this.loading = false;
        //判断数据是否请求完成
        if (data.data.results) {
          this.timestamp = data.data.pre_timestamp; //将请求回的历史时间戳更新为下次加载请求的时间戳
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true; //触发错误提示
        this.loading = false; //将更新关闭
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleAPI({
          channel_id: this.channels.id, //频道id
          timestamp: 1556789000008, //刷新请求的应该是当前时间戳Date.now（）（当前时间戳，因为数据问题所以把时间戳写死了），
          with_top: 0, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // 模拟请求发生错误
        // if (Math.random() > 0.2) {
        //   JSON.parse("adsad1");
        // }
        const {
          data: { results },
        } = data; //解构数据
        this.list.unshift(...results); //将数据加入最前

        this.isLoading = false; //关闭loading状态

        this.sunccessText = `刷新成功,共更新了${results.length}条数据`;
      } catch (error) {
        this.sunccessText = `刷新失败请重试`;
        this.error = true;
        this.isLoading = false; //关闭loading状态
      }
    },
  },
  components: {
    AtricleItem,
  },
};
</script>

<style scoped lang='less'>
.atricleList {
  padding-bottom: 100px;
  height: 80vh; //设置自己的高，避免滚动时，滚动的是body
  overflow-y: auto;
}
</style>