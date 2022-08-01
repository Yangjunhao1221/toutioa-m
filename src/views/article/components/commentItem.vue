<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItem.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentItem.aut_name }}</div>
      <van-button
        class="like-btn"
        :loading="isloading"
        @click="addORdelete"
        :class="{ like: commentItem.is_liking }"
        :icon="commentItem.is_liking ? 'good-job' : 'good-job-o'"
        >{{
          commentItem.like_count > 0 ? commentItem.like_count : "赞"
        }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentItem.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentItem.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          :border="false"
          @click="$emit('reply', commentItem)"
          >回复 {{ commentItem.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteLikeCommentAPI, addLikeCommentAPI } from "@/api";
export default {
  name: "commentItemindex",
  components: {},
  props: {
    commentItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isloading: false, //点赞按钮状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addORdelete() {
      this.isloading = true;

      try {
        if (this.commentItem.is_liking) {
          //已点赞，取消点赞
          await deleteLikeCommentAPI(this.commentItem.com_id);
          this.commentItem.like_count--;
          this.$toast.success("取消成功");
        } else {
          //未点赞，添加点赞
          await addLikeCommentAPI(this.commentItem.com_id);
          this.commentItem.like_count++;
          this.$toast.success("点赞成功");
        }
        this.commentItem.is_liking = !this.commentItem.is_liking;
      } catch (error) {
        this.$toast.fail("出错了,请稍后再试");
      }

      this.isloading = false;
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
    border: 0;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.like {
      color: #e5645f;
    }
  }
}
</style>
