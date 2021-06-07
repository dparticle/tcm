<template>
  <div>
    <van-form @submit="onLogin">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="手机号"
        type="tel"
        :rules="[
          {
            required: true,
            message: '请填写手机号',
          },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '手机号格式错误',
          },
        ]"
        clearable
      />
      <van-field
        v-model="password"
        :type="pwdSeen ? null : 'password'"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        @click-right-icon="onChangePwdSeen"
      >
        <template #right-icon style="color: #b2b5b9">
          <font-awesome-icon v-if="pwdSeen" :icon="['fas', 'eye']" />
          <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
        </template>
      </van-field>
      <div style="margin: 16px; padding-top: 10px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
      <div style="margin: 16px">
        <van-button round block type="default" @click="reg">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faChevronLeft, faEye, faEyeSlash]);

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      pwdSeen: false,
    };
  },
  methods: {
    onLogin: function (values) {
      console.log("发送登录请求");
      console.log(values);
    },
    onChangePwdSeen: function () {
      this.pwdSeen = !this.pwdSeen;
      if (this.pwdSeen) {
        console.log("显示密码");
      } else {
        console.log("隐藏密码");
      }
    },
    reg: function () {
      console.log("登录路由 => 注册路由");
      console.log(this.$store.getters.registerRouterInfo);
      this.$store.commit("EDIT_ROUTER_PATH", { path: "/user/register" });
      console.log(this.$store.state.registerRouterPath);
      this.$router.push(this.$store.state.registerRouterPath);
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped></style>
