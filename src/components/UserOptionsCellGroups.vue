<template>
  <div>
    <!--TODO props 传入生成 cell-group，group 分组 -->
    <van-cell-group>
      <van-cell title="开通会员" icon="diamond-o" size="" is-link></van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="收藏" icon="star-o" size="" is-link></van-cell>
      <van-cell
        title="历史记录"
        icon="browsing-history-o"
        size=""
        is-link
      ></van-cell>
      <van-cell title="联系客服" icon="service-o" size="" is-link></van-cell>
      <van-cell title="收藏" icon="setting-o" size="" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "UserOptionsCellGroups",
};
</script>

<style scoped>
.van-cell-group {
  margin-bottom: 3px;
}

.van-cell__title {
  text-align: left;
  margin-left: 5px;
}
</style>
