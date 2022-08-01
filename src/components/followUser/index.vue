<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="isloading"
    size="small"
    icon="plus"
    v-if="!isFollow"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    :loading="isloading"
    @click="onFollow"
    >已关注</van-button
  >
</template>

<script>
import { unFollowUserAPI, focusUserAPI } from "@/api";
export default {
  name: "followUserIndex",
  //   v-model传值数据的自定义名称
  model: {
    prop: "isFollow", //默认为value
    event: "updata-Follow", //默认为input
  },
  props: {
    userId: {
      type: [String, Number, Object], //object是为了防止大数字
      required: true,
    },
    isFollow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isloading: false, //加载中
    };
  },
  methods: {
    async onFollow() {
      this.isloading = true;
      //   console.log("111");
      try {
        if (!this.isFollow) {
          await focusUserAPI(this.userId); //关注用户
          this.$emit("updata-Follow", !this.isFollow);
          //   console.log("关注成功");
        } else {
          await unFollowUserAPI(this.userId); //取消关注
          this.$emit("updata-Follow", !this.isFollow);
          //   console.log("取消关注");
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "User must be authorized.") {
          this.$toast("请登录");
          return (this.isloading = false);
        }
        if (error.response && error.response.status === 410) {
          this.$toast("用户不能关注自己");
        } else {
          this.$toast("操作失败，请稍后再试");
        }
      }
      this.isloading = false;
    },
  },
};
</script>

<style>
</style>