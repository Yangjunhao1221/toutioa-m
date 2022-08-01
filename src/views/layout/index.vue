<template>
  <div>
    <!-- 子路由入口 -->
    <router-view />
    <!-- tabbar -->
    <van-tabbar v-model="active" class="tabbar" route>
      <van-tabbar-item to="/layout/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span> {{ $store.state.userToken ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layoutIndex",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang='less'>
.tabbar {
  .toutiao {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>