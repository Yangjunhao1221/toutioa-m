<template>
  <div class="tccIndex">
    <van-cell title="我的频道" :border="false">
      <van-button
        round
        type="danger"
        size="mini"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :column-num="4" :border="false">
      <van-grid-item
        v-for="(value, index) in List"
        :key="index"
        class="my-edit"
        @click="OnmyChannels(index, value)"
      >
        <van-icon
          v-show="isEdit && !fixedChannels.includes(value.id)"
          name="clear"
          slot="icon"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          value.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"> </van-cell>
    <van-grid :column-num="4" :border="false">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        class="recommend-edit"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannleAPI, getUserChannleAPI, deletChannelAPI } from "@/api";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "tanchunchengIndex",
  data() {
    return {
      allChannels: [], //所有频道
      isEdit: false, //clear状态
      fixedChannels: [0], //固定频道id
    };
  },
  props: {
    List: {
      type: Array,
      required: true,
    }, //用户频道列表
    active: {
      type: Number,
      required: true,
    },
  },
  beforeCreate() {
    this.isEdit = true;
  },

  created() {
    this.allchannel();
  },
  methods: {
    OnmyChannels(index, channel) {
      if (!this.isEdit) {
        //非编辑状态
        this.$emit("skipChannel", index, false); //激活父组件skipChannel方法
      } else {
        //编辑状态
        //如果为固定频道则不执行删除操作
        if (this.fixedChannels.includes(channel.id)) {
          this.$toast("不可删除");
          return;
        }
        // 如果删除的是当前高亮频道前的频道，则应该将active减去1
        if (index <= this.active) {
          this.$emit("skipChannel", this.active - 1);
        }
        //在List中删除
        this.List.splice(index, 1);
        //判断登陆状态
        if (this.userToken) {
          //已登陆
          this.deletChannel(channel.id); //删除指定id
        } else {
          //未登录
          setItem("localChannel", this.List);
        }
      }
    },
    //获取频道列表
    async allchannel() {
      try {
        const { data } = await getAllChannleAPI();
        // 模拟错误
        // if (Math.random() > 0.1) {
        //   JSON.parse("ssa");
        // }
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("请求数据失败");
      }
    },
    async addChannel(channel) {
      this.List.push(channel); //添加频道
      //数据持久化处理
      if (this.userToken) {
        // console.log("登陆");
        // 用户登录，调用接口添加
        try {
          await getUserChannleAPI({
            id: channel.id, //频道id
            seq: this.List.length, //序号从1开始
          });
        } catch (error) {
          this.$toast("添加失败");
        }
      } else {
        // console.log("未登陆");
        // 用户未登录,将频道列表存入本地
        setItem("localChannel", this.List);
      }
    },
    //发起请求删除用户指定频道
    async deletChannel(target) {
      try {
        await deletChannelAPI(target);
      } catch (error) {
        this.$toast("移除失败，稍后再试");
      }
    },
  },
  computed: {
    ...mapState(["userToken"]),
    //频道推荐筛选：方法2
    recommendChannels() {
      // filter内部生成一个数组，如果内部返回true，就将这个元素添加到新数组类
      return this.allChannels.filter((channel) => {
        return !this.List.find((mychannel) => {
          return mychannel.id === channel.id;
        });
      });
    },
    // 频道推荐筛选：方法1
    // recommendChannels() {
    //   const channels = [];
    //   this.allChannels.forEach((channle) => {
    //     const res = this.List.find((mychannel) => {
    //       return mychannel.id === channle.id;
    //     });
    //     if (!res) {
    //       channels.push(channle);
    //     }
    //   });
    //   return channels;
    // },
    // 映射token
  },
};
</script>

<style scoped lang='less'>
.tccIndex {
  //高亮类
  .active {
    color: red !important;
  }
  padding: 87px 0;
  .van-cell--borderless {
    span {
      font-size: 32px;
    }
    .van-button--danger {
      width: 105px;
      height: 48px;
    }
    .van-button__text {
      font-size: 26px;
    }
  }
  .van-grid {
    .text {
      font-size: 28px;
      color: #222222;
    }
  }

  /deep/ .recommend-edit {
    white-space: nowrap;
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      flex-direction: row;

      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
        color: #222222;
      }
      .van-grid-item__text {
        margin-top: 0;
        font-size: 28px;
        color: #222222;
      }
    }
  }
  /deep/ .my-edit {
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon-clear {
        position: absolute;
        top: 16px;
        right: 15px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>