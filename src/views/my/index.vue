<template>
  <div class="my-container">
    <div class="header" v-if="!$store.state.userToken">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" class="my-img" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="header loginok" v-else>
      <div class="top">
        <div class="left">
          <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="mini" round class="default-btn"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="bottom">
        <div class="items">
          <span class="num">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="items">
          <span class="num">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="items">
          <span class="num">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="items">
          <span class="num">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="grid-nav">
      <van-grid :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell-group>
      <van-cell title="消息通知" is-link class="cell" />
      <van-cell title="小智同学" is-link class="cell md" />
      <van-cell
        title="退出登录"
        clickable
        class="logout"
        v-if="$store.state.userToken"
        @click="onLogout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserAPI } from "@/api";
export default {
  name: "myIndex",
  created() {
    //判断用户是否登录，登录后加载用户信息
    if (this.$store.state.userToken) {
      this.sendGetUserAPI();
    }
  },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    // 用户数据请求
    async sendGetUserAPI() {
      try {
        const { data } = await getUserAPI();
        console.log(data);
        this.userInfo = data.data;
      } catch (error) {
        this.$toast("登陆失败，请稍后再试");
        this.$store.state.userToken = null;
      }
    },
    //退出
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // 确认
          this.$store.commit("updatedUserToken", null); //退出清空token
        })
        .catch(() => {
          // 取消
        });
    },
  },
};
</script>

<style scoped lang='less'>
.my-container {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 361px;
    background-image: url(~@/assets/banner.png);
    background-size: cover;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .my-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: white;
      }
    }
  }
  .header.loginok {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      // background-color: pink;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid white;
        }
        .name {
          font-size: 30px;
          margin-left: 22px;
        }
      }
      .right {
        height: 33px;
        .default-btn {
          font-size: 20px;
          border: 0;
          color: rgb(124, 117, 117);
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 130px;
      // background-color: #ccc;
      .items {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        .num {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      .toutiao.toutiao-shoucang {
        font-size: 45px;
        color: #ed6060;
      }
      .toutiao.toutiao-lishi {
        font-size: 45px;
        color: #ffedb2;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .cell {
    height: 100px;
    font-size: 30px;
  }
  .logout {
    text-align: center;
    color: #d86262;
  }
  .md {
    margin-bottom: 9px;
  }
}
</style>