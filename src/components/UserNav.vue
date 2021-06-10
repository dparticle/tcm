<template>
  <van-nav-bar
    :border="false"
    @click-left="onLeftClick"
    @click-right="onRightClick"
  >
    <template #left>
      <font-awesome-icon class="van-nav-bar-icon" :icon="['fas', 'qrcode']" />
    </template>
    <template #right>
      <font-awesome-icon
        v-if="$store.state.darkMode"
        class="van-nav-bar-icon"
        :icon="['fas', 'moon']"
      />
      <font-awesome-icon
        v-else
        class="van-nav-bar-icon"
        :icon="['fas', 'sun']"
      />
    </template>
  </van-nav-bar>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faSun, faMoon, faQrcode]);

export default {
  name: "UserNav",
  methods: {
    onLeftClick: function () {
      console.log("我的页面左侧图标点击");
      //TODO 扫描二维码
      console.log("扫描二维码");
    },
    onRightClick: function () {
      console.log("我的页面右侧图标点击");
      if (this.$store.state) {
        console.log("关闭暗黑模式");
      } else {
        console.log("开启暗黑模式");
      }
      this.$store.commit("REVERSE_DARKMODE");
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
/* 直接修改 right、left 无法生效，只能额外加 calss */
.van-nav-bar-icon {
  color: #646566;
  font-size: 16px;
}
</style>
