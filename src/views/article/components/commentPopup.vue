<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.length"
      @click="sendComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentsAPI } from "@/api";
export default {
  name: "CommentPost",
  inject: ["art_id"],
  components: {},
  props: {
    atricleId: {
      type: [Number, String, Object],
      required: true,
    },
  },

  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //发布评论
    async sendComment() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
      });
      //   发送请求上传数据;
      try {
        const { data } = await addCommentsAPI({
          target: this.atricleId.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, //评论内容
          art_id: this.art_id ? this.art_id.toString() : this.art_id, //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        //清除并关闭文本框
        this.$emit("downPopup", data.data);
        this.message = "";
        // console.log(data);
      } catch (error) {
        this.$toast.fail("发布失败，稍后再试");
      }
      this.$toast.success("评论成功");
      //更新评论数组（重点）
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
