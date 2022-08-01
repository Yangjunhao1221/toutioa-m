
<template>
  <div class="Suggestion">
    <van-cell
      v-for="(item, index) in SuggestionList"
      icon="search"
      :key="index"
      @click="$emit('clickSuggestion', item)"
    >
      <div slot="title" v-html="heighLight(item)"></div
    ></van-cell>
  </div>
</template>

<script>
import { getSuggestionAPI } from "@/api";
export default {
  name: "searchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      SuggestionList: [], //联想建议
      timer: null, //防抖
    };
  },
  methods: {
    // 联想建议请求
    async getSuggestion(val) {
      const { data } = await getSuggestionAPI(val);
      console.log(data);
      this.SuggestionList = data.data.options;
    },
    // 联想建议高亮
    heighLight(text) {
      const res = new RegExp(this.searchText, "gi");
      return text.replace(
        res,
        `<span class="active">${this.searchText}</span>`
      );
    },
  },
  watch: {
    searchText: {
      handler(newVal) {
        // 防抖
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getSuggestion(newVal);
        }, 200);

        // console.log(newVal);
      },
      immediate: true, //进入就页面触发
    },
  },
};
</script>

<style scoped lang='less'>
.Suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>