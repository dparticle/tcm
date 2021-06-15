<!-- 带返回上一个路由的导航栏，自定义 title -->
<template>
  <van-nav-bar :title="title" @click-left="onClickLeft">
    <template #left>
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronLeft);

export default {
  name: "BackNav",
  methods: {
    onClickLeft: function () {
      console.log("返回");
      this.$router.back();
    },
  },
  components: {
    FontAwesomeIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped></style>
