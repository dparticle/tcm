<template>
  <div class="login">
    <back-nav :title="navTitleName" />
    <div class="header">
      <van-row type="flex" justify="center" style="">
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
      <login-form />
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import BackNav from "../components/BackNav";

export default {
  name: "Login",
  data() {
    return {
      navTitleName: "登录",
      logoUrl: require("../assets/logo.png"),
    };
  },
  components: {
    BackNav,
    LoginForm,
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
