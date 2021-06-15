<template>
  <div class="tcm-card">
    <!-- 是否有图片资源 -->
    <van-image v-if="img" class="img" height="120" :src="img" />
    <van-image v-else class="img" height="120" :src="noPhotoSrc" />
    <van-row type="flex" justify="center">
      <van-col>
        <div class="name">{{ name }}</div>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col>
        <div class="name-eng">{{ nameEng }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "TcmCard",
  data() {
    return {
      noPhotoSrc: require("../assets/no-photo-assets.png"),
    };
  },
  props: {
    id: Number,
    name: String,
    nameEng: String,
    img: String,
  },
};
</script>

<style scoped>
.tcm-card {
  background-color: #ffffff;
  margin-bottom: 6px;
  height: 190px;
}

.img {
  width: 100%;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.name-eng {
  font-size: 14px;
  text-align: center;
  color: #646566;
  font-style: italic;
}
</style>
