<template>
  <div class="SearchIndex">
    <!-- 搜索框 -->
    <form action="/" class="from_search">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        background="#3296fa"
        @focus="onFocus"
      />
    </form>
    <div class="all">
      <!-- 搜索结果 -->
      <search-result v-if="Search" :searchText="searchText" />
      <!-- 联想建议 -->
      <search-suggestion
        v-else-if="searchText"
        :searchText="searchText"
        @clickSuggestion="onSearch"
      />
      <!-- 搜索历史 -->
      <search-history
        v-else
        :search_text="searchHistory"
        @searchHistory="onSearch"
        @allDelete="allDelete"
      />
    </div>
  </div>
</template>

<script>
import SearchHistory from "./components/SearchHistory.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import { getItem, setItem } from "@/utils/storage";
export default {
  name: "SearchIndex",
  data() {
    return {
      searchText: "",
      value: "",
      Search: false, //搜索状态
      searchHistory: getItem("searchHistories") || [], //搜索历史
    };
  },

  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  methods: {
    onSearch(val) {
      this.Search = true;
      this.searchText = val; //输入框等于点击联想建议的值
      let a = this.searchHistory.indexOf(val);
      if (a !== -1) {
        this.searchHistory.splice(a, 1); //历史相同删除
      }
      this.searchHistory.unshift(val); //开头添加
    },
    onCancel() {
      this.$router.back();
    },
    onFocus() {
      this.Search = false;
    },
    allDelete() {
      this.searchHistory = [];
    },
  },
  watch: {
    searchHistory: {
      handler(newVal) {
        //数据持久化
        setItem("searchHistories", newVal);
      },
    },
  },
};
</script>

<style scoped lang='less'>
.SearchIndex {
  .van-search__action {
    color: white;
  }
  .from_search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .all {
    padding-top: 108px;
  }
}
</style>