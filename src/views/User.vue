<template>
  <div class="user">
    <!--    User Router-->
    <van-button v-if="$store.state.token" round type="primary" @click="logout"
      >退出登录
    </van-button>
    <van-button v-else round type="primary" to="/user/login"
      >跳转至登录界面
    </van-button>
  </div>
</template>

<script>
export default {
  name: "User",
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$store.commit("SET_TOKEN", { token: undefined });
      this.$store.commit("SET_USER", { user: undefined });
    },
    toRouter: function (name) {
      console.log("跳转 push 至 " + name + " 路由");
      // this.$router.push(name);
    },
  },
};
</script>

<style scoped></style>
