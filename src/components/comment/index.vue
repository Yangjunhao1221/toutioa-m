<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="err"
    error-text="请重试"
    :immediate-check="false"
  >
    <commentItemindex
      v-for="(item, index) in commentList"
      :key="index"
      :commentItem="item"
      :border="false"
      @reply="$emit('reply', $event)"
    />
  </van-list>
</template>

<script>
import { commentListAPI } from "@/api";
import commentItemindex from "@/views/article/components/commentItem.vue";
export default {
  name: "commentIndex",
  created() {
    this.loading = true;
    this.onLoad(); //因为组件没到可视区域不会触发onload事件，所以进入文章页面的评论数不会更新，所以手动触发onload事件，进入页面就更新评论数。
  },
  components: {
    commentItemindex,
  },
  props: {
    atricleId: {
      type: [Number, String, Object],
      required: true,
    },
    commentList: {
      type: Array,
      default: () => [], //默认为一个空数组
    },
    type: {
      type: String,
      default: "a",
      validator(val) {
        return ["a", "c"].includes(val); //自定义校验规则，val为传入的值
      },
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      lastId: null, //用于offset请求数据
      // commentList: [],//将评论列表设置为props，这样通过父组件就可以添加评论
      err: false, //错误状态
    };
  },
  methods: {
    async onLoad() {
      // console.log("父组件调用");
      try {
        const {
          data: { data },
        } = await commentListAPI({
          type: this.type, //a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.atricleId.toString(), //源id，文章id或评论id
          offset: this.lastId, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 20,
        });
        // console.log(data);
        //判断数据是否全部加载完成
        if (data.last_id) {
          this.lastId = data.last_id;
        } else {
          this.finished = true;
          this.loading = false;
          return;
        }
        //将评论数量传入父组件
        this.$emit("comment-data", data);
        //将请求回的数据存入数组
        //   this.commentList = [this.commentList, ...data.data.results];
        this.commentList.push(...data.results);
        this.lastId = data.last_id;
      } catch (error) {
        this.err = true;
      }
      // 加载状态结束
      this.loading = false;
    },
  },
};
</script>

<style lang='less' scoped>
</style>