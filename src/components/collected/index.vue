<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    style="border: 0"
    :class="value ? 'collected' : ''"
    @click="clickCollected"
    :loading="isloading"
  />
</template>

<script>
import { addCollectedAPI, deleteCollectedAPI } from "@/api";
export default {
  name: "collectedIndex",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    atricleId: {
      type: [String, Number, Object],
      required: true,
    },
    attitude: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isloading: false, //按钮默认加载状态
    };
  },
  methods: {
    async clickCollected() {
      if (this.attitude === null) {
        return this.$toast("请登录");
      }
      this.isloading = true;
      try {
        if (this.value) {
          //取消收藏
          await deleteCollectedAPI(this.atricleId);
        } else {
          //收藏文章
          await addCollectedAPI(this.atricleId);
        }
      } catch (error) {
        this.$toast.fail("稍后再试");
      }
      this.$emit("input", !this.value); //自定义事件修改数据不是立即的，所以下面的提示逻辑还是只能用当前组件的值
      this.$toast(this.value ? "取消收藏" : "收藏成功");
      this.isloading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.van-button {
  padding: 0;
}
.collected {
  color: #ffa500;
}
</style>