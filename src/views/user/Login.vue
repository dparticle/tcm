<template>
  <div class="login">
    <back-nav :title="navTitleName" />
    <div class="header">
      <van-row type="flex" justify="center">
        <van-col>
          <van-image class="logo" width="100" height="100" :src="logoUrl">
            <template v-slot:error>加载失败</template>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <van-form @submit="onLogin">
        <van-field
          v-model="user.phone"
          name="phone"
          label="手机号"
          placeholder="手机号"
          type="tel"
          :rules="[
            {
              required: true,
              message: '请填写手机号',
            },
            {
              // 手机号正则表达式匹配
              pattern:
                /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
              message: '手机号格式错误',
            },
          ]"
          clearable
        />
        <van-field
          v-model="user.password"
          :type="pwdSeen ? undefined : 'password'"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          @click-right-icon="onChangePwdSeen"
        >
          <template #right-icon style="color: #b2b5b9">
            <!-- 显示隐藏密码 -->
            <password-seen-icon :value="pwdSeen" />
          </template>
        </van-field>
        <div style="margin: 16px; padding-top: 10px">
          <van-button round block type="info" native-type="submit"
            >登录
          </van-button>
        </div>
      </van-form>
      <div style="margin: 16px">
        <van-button round block type="default" @click="reg">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../../components/BackNav";
import md5 from "md5";
import { mapActions } from "vuex";
import PasswordSeenIcon from "../../components/PasswordSeenIcon";

export default {
  name: "Login",
  data() {
    return {
      navTitleName: "登录",
      logoUrl: require("../../assets/logo.png"),
      user: {
        phone: "",
        password: "",
      },
      pwdSeen: false,
    };
  },
  methods: {
    onLogin: function (values) {
      values.password = md5(values.password);
      const payload = {
        values: values,
        $api: this.$api,
        $router: this.$router,
      };
      this.login(payload);
    },
    onChangePwdSeen: function () {
      this.pwdSeen = !this.pwdSeen;
    },
    reg: function () {
      console.log("登录路由 => 注册路由");
      // console.log(this.$store.getters.registerRouterInfo);
      this.$store.commit("SET_ROUTER_PATH", { path: "/register" });
      // console.log(this.$store.state.registerRouterPath);
      this.$router.push(this.$store.state.registerRouterPath);
    },
    // 调用 vuex 中的 login 的 action
    ...mapActions({
      login: "login",
    }),
  },
  mounted() {
    // 自动填充 phone，可以实现
    // this.user.phone = this.$store.state.phone;
    this.user.phone = this.$route.query.phone;
  },
  components: {
    BackNav,
    PasswordSeenIcon,
  },
};
</script>

<style scoped>
.logo {
  padding-top: 50px;
}

.content {
  margin-top: 50px;
}
</style>
