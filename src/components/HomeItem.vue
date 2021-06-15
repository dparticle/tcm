<!-- 首页专题/详情页信息组件 -->
<template>
  <div class="home-item">
    <div class="header">
      <span class="border"></span>
      <span class="title">{{ title }}</span>
      <span v-if="describe" class="describe">{{ describe }}</span>
      <span v-if="moreTo">
        <router-link :to="moreTo" class="more">更多</router-link>
      </span>
    </div>
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HomeItem",
  props: {
    title: String,
    describe: String,
    moreTo: String,
  },
};
</script>

<style scoped>
.home-item {
  background-color: #ffffff;
  padding: 4px 6px;
  margin-top: 6px;
}

.header {
  padding: 4px 0;
}

.border {
  border-left: 3px solid green;
}

.title {
  margin-left: 6px;
  font-weight: bold;
}

.describe {
  font-size: 12px;
  margin-left: 6px;
  color: #646566;
}

.more {
  float: right;
  color: #000000;
  font-size: 12px;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 0 6px;
}
</style>
