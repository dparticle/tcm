<template>
  <div>
    <BackNav title="个人信息" />
    <!--TODO 固定的 cell 是不是没必要用 js，我个人觉得写死更好 -->
    <van-cell-group>
      <van-cell center title="头像" is-link>
        <template #default>
          <van-image
            width="25"
            height="25"
            :src="$store.state.user.avatar_url"
            style="border-radius: 3px"
          />
        </template>
      </van-cell>
      <!--TODO 更改用户名 -->
      <van-cell
        center
        title="用户名"
        is-link
        :value="$store.state.user.username"
      />
      <van-cell
        center
        title="手机号"
        is-link
        :value="$store.state.user.phone"
      />
      <van-cell center title="二维码名片" is-link>
        <template #default>
          <van-icon name="qr" size="16" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top: 6px">
      <van-cell center title="更改密码" is-link />
    </van-cell-group>
    <van-button
      plain
      hairline
      type="danger"
      @click="logout"
      style="width: 100%; margin-top: 20px"
      >退出登录
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

<style scoped>
.van-cell__title {
  text-align: left;
}
</style>
