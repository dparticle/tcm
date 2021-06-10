<template>
  <div>
    <BackNav title="个人信息" />
    <!--TODO 个人信息 cell-group value -->
    <van-button v-if="$store.state.token" round type="primary" @click="logout"
      >退出登录
    </van-button>
    <van-button v-else round type="primary" to="/user/login"
      >跳转至登录界面
    </van-button>
  </div>
</template>

<script>
import BackNav from "../components/BackNav";

export default {
  name: "UserInfo",
  //TODO 修改 username，更新后 user 需要更新
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$store.commit("SET_TOKEN", { token: undefined });
      this.$store.commit("SET_USER", { user: undefined });
    },
  },
  components: {
    BackNav,
  },
};
</script>

<style scoped></style>
