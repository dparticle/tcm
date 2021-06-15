<!-- 显示用户信息的单元格 -->
<template>
  <van-cell-group :border="false" class="user-info">
    <van-cell
      v-if="$store.state.user"
      center
      size="large"
      :title="$store.state.user.username"
      :label="'手机号：' + $store.state.user.phone"
      is-link
      to="/user/info"
    >
      <template #icon>
        <van-image
          class="avatar"
          round
          width="60"
          height="60"
          :src="$store.state.user.avatar_url"
        />
      </template>
    </van-cell>
    <van-cell
      v-else
      center
      size="large"
      title="点击登录"
      is-link
      to="/user/login"
    >
      <template #icon>
        <van-image
          class="avatar"
          round
          width="60"
          height="60"
          src="https://img01.yzcdn.cn/vant/leaf.jpg"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: "UserInfoCellGroup",
};
</script>

<style scoped>
.user-info {
  padding-bottom: 5px;
}

/* 单元格默认居中显示、调整 title 字大小 */
.van-cell__title {
  /* 和头像与左边距相同 */
  margin-left: 16px;
  font-size: 18px;
}

.van-cell__label {
  font-size: 13px;
}
</style>
