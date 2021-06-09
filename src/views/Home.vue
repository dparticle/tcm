<template>
  <div class="home">
    <div class="header">
      <van-search
        v-model="searchContent"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        clearable
      />
    </div>
    <div class="content">
      <h3>养生推荐</h3>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <!-- TODO 养生推荐的组件 v-for -->
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <h3>热文推荐</h3>
      <!-- TODO 养生推荐的组件 v-for -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchContent: "",
    };
  },
  methods: {
    onSearch: function () {
      console.log("首页导航栏搜索");
      // axios test
      this.$api.tcm
        .getImgUrls({
          tcm_id: 1,
        })
        .then((response) => {
          console.log(response);
          // response.data.forEach((v) => {
          //   console.log(v.tcm_id, v.img_url);
          // });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.content {
  padding: 0 10px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
