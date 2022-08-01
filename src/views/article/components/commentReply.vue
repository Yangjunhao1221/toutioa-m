<template>
  <div class="reply">
    <van-nav-bar
      :title="
        commentContent.reply_count > 0
          ? commentContent.reply_count + '条回复'
          : '暂无回复'
      "
    >
      <van-icon @click="$emit('close')" slot="left" name="cross" />
    </van-nav-bar>
    <div class="scroll">
      <commentItem :commentItem="commentContent" />
      <van-cell title="全部回复" />
      <commentList :atricleId="commentContent.com_id" type="c" />
    </div>
    <div class="bottom-btn">
      <van-button type="small" round class="btn" @click="show = true"
        >发布评论</van-button
      >
    </div>
    <van-popup v-model="show" position="bottom">
      <CommentPost :atricleId="commentContent.com_id" @downPopup="downPopup" />
    </van-popup>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import commentList from "@/components/comment";
import CommentPost from "./commentPopup.vue";
export default {
  name: "commentReply",
  components: {
    commentItem,
    commentList,
    CommentPost,
  },

  data() {
    return {
      show: false,
    };
  },
  props: {
    commentContent: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downPopup(data) {
      console.log(1);
      this.show = false;
      console.log(data);
    },
  },
};
</script>

<style lang='less' scoped>
.reply {
  .scroll {
    position: fixed;
    width: 100%;
    top: 92px;
    bottom: 88px;
    overflow-y: auto;
  }
  .bottom-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      width: 60%;
      background-color: #fff;
      border: 0;
    }
  }
}
</style>