<template>
  <van-button
    :icon="value == 1 ? 'good-job' : 'good-job-o'"
    style="border: 0"
    :class="{ like: value == 1 }"
    @click="clickLike"
    :loading="isloading"
  />
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from "@/api";
export default {
  name: "likeIndex",
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    atricleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      isloading: false,
    };
  },
  methods: {
    async clickLike() {
      if (this.value === null) {
        return this.$toast("请登录");
      }
      let status = 1;
      this.isloading = true;

      try {
        if (this.value == 1) {
          //取消点赞
          await deleteLikeAPI(this.atricleId);
          status = -1;
        } else {
          //点赞
          await addLikeAPI(this.atricleId);
        }
      } catch (error) {
        console.log(error);
        this.$toast.fail("稍后再试");
      }
      this.$emit("input", status);
      //自定义事件修改数据不是立即的，所以下面的提示逻辑还是只能用当前组件的值
      this.$toast.success(this.value == 1 ? "取消成功" : "点赞成功");
      this.isloading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.like {
  color: #e5645f;
}
</style>