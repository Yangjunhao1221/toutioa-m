<template>
  <div class="homeContainer">
    <!-- serach -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type="info" to="/search" round class="sreach-btn"
        ><van-icon name="search" class="icon" />搜索</van-button
      >
    </van-nav-bar>
    <!-- serach -->
    <!-- tab -->
    <!-- 为什么标签内容是懒渲染的？
- 因为这是 Tab 标签页组件本身支持的默认功能，如果不需要可以通过配置 :lazy-render="false" 来关闭这个效果。 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="tabnav">
      <van-tab :title="items.name" v-for="items in articleList" :key="items.id">
        <!-- 文章列表组件，每个都是独立的 -->
        <Articleli :channels="items" />
      </van-tab>
      <div slot="nav-right" class="zhanwie"></div>
      <div slot="nav-right" class="hanbao">
        <i class="toutiao toutiao-gengduo" @click="show = true"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Tcc :List="articleList" :active="active" @skipChannel="OnSkipChannel" />
    </van-popup>
    <!-- tab -->
  </div>
</template>

<script>
import { articleListAPI } from "@/api";
import Tcc from "./components/tanchucheng.vue";
import Articleli from "./components/articleList.vue";
import { mapState } from "vuex";
import { getItem, setItem } from "@/utils/storage";
export default {
  name: "homeIndex",
  data() {
    return {
      active: 0, //频道高亮
      articleList: [], //用户列表，没有token返回推荐列表
      show: false, //弹出层状态
    };
  },
  async created() {
    try {
      // const { data } = await articleListAPI();
      // this.articleList = data.data.channels;
      if (this.userToken) {
        //已登录
        const { data } = await articleListAPI();
        this.articleList = data.data.channels;
      } else {
        //未登录
        //判断本地是否有数据
        if (getItem("localChannel")) {
          //有数据直接用
          this.articleList = getItem("localChannel");
        } else {
          //本地没有数据，就发起请求取到默认频道列表
          const { data } = await articleListAPI();
          this.articleList = data.data.channels;
        }
      }
    } catch (error) {
      this.$toast("请求列表失败");
      setItem("Token-toutiao", "");
    }
  },
  components: {
    Articleli,
    Tcc,
  },
  methods: {
    // Tcczhuangtai = true默认值为true(没有传值的化就是true，传值的话就等于传的值)
    OnSkipChannel(index, Tcczhuangtai = true) {
      this.active = index; //设置高亮
      this.show = Tcczhuangtai; //弹出层状态
    },
  },
  computed: {
    ...mapState(["userToken"]),
  },
};
</script>

<style scoped lang='less'>
.homeContainer {
  .van-nav-bar__title {
    max-width: unset;
    .sreach-btn {
      height: 64px;
      width: 555px;
      line-height: 64px;
      font-size: 28px;
      background-color: #5babfb;

      .icon {
        color: white;
        font-size: 32px;
        margin-right: 8px;
      }
    }
  }
  /deep/ .tabnav {
    //当样式在一个作用域下时，默认只作用在组件根节点，所以加入deep深度操作符
    .van-tabs__wrap {
      position: fixed;
      height: 1.17333rem;
      left: 0; //、
      right: 0; //
      top: 92px;
      z-index: 1;
    }
    .van-tabs__content {
      padding-top: 180px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      .van-tab {
        // border-right: 1px solid #edeff3;
        color: #777;
        .van-tab__text {
          font-size: 30px;
        }
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px !important;
        height: 6px;
        background-color: #3296fa;
      }
    }
    .hanbao {
      position: fixed;
      display: flex;
      right: 0;
      justify-content: center;
      align-items: center;

      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url("@/assets/gradient-gray-line.png");
      }
    }
    .zhanwie {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>