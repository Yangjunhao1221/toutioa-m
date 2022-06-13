<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="LoginForm">
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            class="Sms"
            :time="60 * 1000"
            format="ss s"
            v-if="SmsTimer"
            @finish="finish"
          />
          <van-button
            v-else
            size="small"
            type="default"
            native-type="button"
            class="input-btn"
            @click="formGetSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="dl-btn">
        <van-button block type="info" class="btn" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { UserloginAPI, sendSmsAPI } from "@/api";
export default {
  name: "LogonIndex",
  data() {
    return {
      SmsTimer: false,
      user: {
        mobile: "13711111111",
        code: "246810",
      },
      rules: {
        // 表单验证从上到下，验证不通过直接显示当前验证，并且不往下执行
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|8|9|7]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码为6位",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit(val) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      const user = this.user;

      try {
        const res = await UserloginAPI(user);
        console.log(res);
        this.$store.commit("updatedUserToken", res.data.data); //将获取到的token存入本地
        this.$toast.success("登录成功");
        this.$router.back(); //这个方法不严谨
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          this.$toast.fail("手机或验证码错误");
        } else {
          this.$toast.fail("请稍后再试");
        }
      }
      console.log(1);
    },
    async formGetSms() {
      // 校验手机号
      try {
        await this.$refs.LoginForm.validate("mobile");
      } catch (error) {
        this.$toast.fail(error);
        return;
      }
      // 验证通过倒计时

      try {
        this.SmsTimer = true;
        await sendSmsAPI(this.user.mobile);
        this.$toast.success("获取成功");
        this.user.code = "";
      } catch (error) {
        if (error.request.status === 429) {
          this.SmsTimer = false;
          this.$toast.fail("获取频繁,稍后再试");
        } else {
          this.SmsTimer = false;
          this.$toast.fail("获取失败,稍后再试");
        }
      }
    },
    finish() {
      this.SmsTimer = false;
    },
  },
};
</script>

<style scoped lang='less'>
.login-container {
  .van-field__left-icon {
    .toutiao {
      font-size: 37px;
    }
  }
  .input-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    padding: 0;
    font-size: 22px;
    border: 0;
    color: #666666;
  }
  .dl-btn {
    margin: 53px 28px;
    .btn {
      background-color: #6db4fb;
      border: 0;
    }
  }
  .Sms {
    width: 152px;
    text-align: center;
  }
}
</style>