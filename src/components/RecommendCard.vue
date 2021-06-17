<template>
  <div class="recommend-card" @click="toDetails">
    <van-image
      v-if="info.imgs.length !== 0"
      class="img"
      height="125"
      :src="info.imgs[0]"
    />
    <van-image v-else class="img" height="125" :src="noPhotoSrc" />
    <div class="text">
      <div class="name">{{ info.name }}</div>
      <div class="actions">功效：{{ info.actions }}</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "RecommendCard",
  data() {
    return {
      noPhotoSrc: require("../assets/no-photo-assets.png"),
    };
  },
  props: {
    info: Object,
  },
  methods: {
    toDetails: function () {
      if (this.$store.state.token) {
        console.log("跳转至 " + this.info.id + " id 详情页");
        this.$router.push({
          path: "/tcm/details",
          query: {
            id: this.info.id,
          },
        });
      } else {
        Toast("请登录");
      }
    },
  },
};
</script>

<style scoped>
.img {
  width: 100%;
}

.name {
  text-align: center;
  font-weight: bold;
  margin-top: 6px;
}

.actions {
  color: #646566;
  margin-top: 6px;
  font-size: 14px;
}
</style>
