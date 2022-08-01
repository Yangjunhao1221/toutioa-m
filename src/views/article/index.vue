<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isload">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        class="article-detail markdown-body"
        v-else-if="myArticleDetails.aut_name"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{ myArticleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="myArticleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ myArticleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ myArticleDetails.pubdate | relativeTime }}
          </div>
          <!-- ****关注按钮组件**** -->
          <!-- 当父组件传给子组件的值要通过子组件触发自定义事件该值，可以用v-model组件传值简化 -->
          <!-- 
            向父组件传值
            :btnFollow="myArticleDetails.is_followed"
            触发自定义事件
           @changFollow="myArticleDetails.is_followed = $event" -->
          <followUser
            class="follow-btn"
            :userId="myArticleDetails.aut_id"
            v-model="myArticleDetails.is_followed"
          />
          <!-- 封装组件 -->
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            :loading="isloading"
            size="small"
            icon="plus"
            v-if="btnFollow"
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
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="ac"
          v-html="myArticleDetails.content"
        ></div>

        <van-divider>正文结束</van-divider>
        <comment
          @reply="commentReply"
          ref="comment"
          :atricleId="myArticleDetails.art_id"
          @comment-data="total_count = $event.total_count"
          :commentList="commentList"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="write"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="total_count" color="#777" />

          <collected
            v-model="myArticleDetails.is_collected"
            :atricleId="myArticleDetails.art_id"
            :attitude="myArticleDetails.attitude"
          />
          <likeIndex
            v-model="myArticleDetails.attitude"
            :atricleId="myArticleDetails.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isShow" position="bottom">
          <commentPopup
            :atricleId="myArticleDetails.art_id"
            @downPopup="downPopup"
          ></commentPopup>
        </van-popup>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errState === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 回复弹出层 -->
    </div>
    <!-- v-if="isReply"这个v-if是为了解决由于弹出层懒加载而出现不重新请求回复数据的问题，所以直接用v-if把组件销毁，里面的数据也随之销毁了，下次请求就会重新获取数据 -->
    <van-popup
      v-if="isReply"
      v-model="isReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <commentReply @close="isReply = false" :commentContent="commentContent" />
    </van-popup>
  </div>
</template>

<script>
import { articleDetailsAPI } from "@/api";
import { ImagePreview } from "vant";
import followUser from "@/components/followUser";
import collected from "@/components/collected";
import likeIndex from "@/components/like";
import comment from "@/components/comment";
import commentPopup from "./components/commentPopup.vue";
import commentReply from "./components/commentReply.vue";
import { commentListAPI } from "@/api";
export default {
  name: "ArticleIndex",
  components: {
    followUser,
    collected,
    likeIndex,
    comment,
    commentPopup,
    commentReply,
  },

  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      myArticleDetails: [],
      isload: true,
      errState: 0,
      total_count: 0,
      isShow: false, //评论弹 出层
      commentList: [], //评论列表
      isReply: false, //回复弹出层状态
      commentContent: null, //评论回复内容
    };
  },

  computed: {},
  watch: {},
  created() {
    this.getArticle();
  },
  mounted() {},
  methods: {
    //评论回复逻辑
    commentReply(comment) {
      this.isReply = true;
      this.commentContent = comment; //保存评论的详细信息
    },
    //写评论
    write() {
      this.isShow = true;
    },
    //发布评论修改弹出层状态
    downPopup(value) {
      this.isShow = false;
      // this.commentList.unshift(value。newobj);//数据有问题（发送后没有newObj返回），如果数据准确应该这样写，
      this.$refs.comment.onLoad(); //想调用子组件的方法，但是方法调用了，数据也更新了，就是视图没更新（*********未解决*********）
    },
    async getArticle() {
      this.isload = true;
      try {
        const { data } = await articleDetailsAPI(this.articleId);
        // console.log(data);
        // 模拟err
        // if (Math.random() > 0.2) {
        //   JSON.parse("eqeqqw");
        // }
        this.myArticleDetails = data.data;
        // if (this.myArticleDetails.is_followed === true) {
        //   this.btnFollow = false;
        // }
        setTimeout(() => {
          this.getImg();
        }, 0);
      } catch (error) {
        // console.log(error);
        if (error.response && error.response.status === 404) {
          this.errState = 404;
        }
      }
      this.isload = false;
    },
    getImg() {
      // console.log(this.$refs["ac"]);
      let content = this.$refs["ac"];
      let img = content.querySelectorAll("img");
      let images = [];
      // console.log(img);
      img.forEach((element, index) => {
        images.push(element.currentSrc);
        element.onclick = function () {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
      // console.log(images);
    },
    // async onFollow() {
    //   this.isloading = true;

    //   try {
    //     if (this.btnFollow === true) {
    //       await focusUserAPI(this.myArticleDetails.aut_id); //关注用户
    //       this.btnFollow = false;
    //     } else {
    //       await unFollowUserAPI(this.myArticleDetails.aut_id); //取消关注
    //       this.btnFollow = true;
    //     }
    //   } catch (error) {
    //     // console.log(error);
    //     if (error.response && error.response.status === 410) {
    //       this.$toast("用户不能关注自己");
    //     } else {
    //       this.$toast("操作失败，请稍后再试");
    //     }
    //   }
    //   this.isloading = false;
    // },
  },
  provide: function () {
    return {
      art_id: this,
    };
  }, //(没有做这个模块，因为依赖注入接收不到数据（未解决）)
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  /deep/ .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>