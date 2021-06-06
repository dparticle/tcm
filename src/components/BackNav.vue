<template>
  <van-nav-bar
      :title="title"
      @click-left="onClickLeft"
  >
    <template #left>
      <font-awesome-icon :icon="['fas', 'chevron-left']"/>
    </template>
  </van-nav-bar>
</template>

<script>
import router from "../router";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft);

export default {
  name: "BackNav",
  methods: {
    onClickLeft: function () {
      console.log("返回");
      router.back();
    },
  },
  components: {
    FontAwesomeIcon
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    }
  }
}
</script>

<style scoped>

</style>
