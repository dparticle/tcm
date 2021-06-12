<template>
  <div>
    <back-nav title="设置" />
    <van-cell-group>
      <!-- 代码写炸的急救措施 -->
      <van-cell center title="清除缓存" is-link @click="show = true" />
      <van-dialog
        v-model="show"
        title="清除缓存"
        message="所有本地缓存 (localStorage) 将会被清除（包括登录状态）"
        showCancelButton
        @confirm="deleteCache"
        @cancel="show = false"
      />
      <van-cell center title="关于" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from "vant";
import BackNav from "../components/BackNav";

export default {
  name: "Setting",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    deleteCache: function () {
      // localStorage.length 返回的是存在 key 个数
      if (this.$store.state.token) {
        localStorage.clear();
        this.$store.commit("SET_TOKEN", { token: undefined });
        this.$store.commit("SET_USER", { user: undefined });
        Toast.success("清除成功");
      } else {
        Toast.fail("无缓存");
      }
      this.show = false;
    },
  },
  components: {
    BackNav,
  },
};
</script>

<style scoped>
.van-cell__title {
  text-align: left;
  margin-left: 5px;
}
</style>
