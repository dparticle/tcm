<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/" name="home">
      <span>首页</span>
      <!-- 插槽 -->
      <template #icon>
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="van-tabbar-item-icon"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/storehouse" name="storehouse">
      <span>药库</span>
      <template #icon>
        <font-awesome-icon
          :icon="['fas', 'archive']"
          class="van-tabbar-item-icon"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/user" name="user">
      <span>我的</span>
      <template #icon>
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="van-tabbar-item-icon"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/test" name="test">
      <span>测试</span>
      <template #icon>
        <font-awesome-icon
          :icon="['fas', 'vial']"
          class="van-tabbar-item-icon"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
// 按需导入
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faArchive,
  faVial,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faHome, faUser, faArchive, faVial]);

export default {
  name: "BottomBar",
  data() {
    return {
      active: "home",
    };
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.van-tabbar-item-icon {
  /* 图标大小 */
  font-size: 18px;
}
</style>
