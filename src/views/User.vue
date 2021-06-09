<template>
  <div class="user">
    <!--    User Router-->
    <van-button v-if="!signStatus" round type="primary" to="/user/login"
      >跳转至登录界面
    </van-button>
    <van-button v-else round type="primary" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { stringCheck } from "../util/util";

export default {
  name: "User",
  computed: {
    signStatus: function () {
      // console.log(this.$store.state.token);
      return stringCheck(this.$store.state.token);
    },
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$store.commit("SET_TOKEN", { token: "" });
    },
  },
};
</script>

<style scoped></style>
