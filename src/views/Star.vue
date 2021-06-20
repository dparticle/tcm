<template>
  <div class="star">
    <back-nav title="收藏"></back-nav>

    <van-list
      v-if="this.$store.state.token"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- key 应该用整个 item 还是 index，建议是 string/number，因此用 index -->
      <van-swipe-cell v-for="(item, index) in starList" :key="index">
        <van-cell :title="item.name" @click="toDetails(item.id)" />
        <template #right>
          <van-button
            square
            type="danger"
            text="取消收藏"
            @click="cancleStar(item.id)"
          />
        </template>
      </van-swipe-cell>
    </van-list>
    <van-empty v-else image="search" description="未登录，无法获取收藏列表" />
  </div>
</template>

<script>
import BackNav from "../components/BackNav";
import { Toast } from "vant";
import { arrRemoveJson } from "../util/util";
import baseURL from "../api/base";

export default {
  name: "Star",
  data() {
    return {
      starList: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    toDetails: function (id) {
      //TODO 只解决了是否登录，过期如何解决
      if (this.$store.state.token) {
        console.log("跳转至 " + id + " id 详情页");
        this.$router.push({
          path: `/tcm/${id}`,
          params: {
            id: this.id,
          },
        });
      } else {
        Toast("请登录");
      }
    },
    // 取消收藏
    cancleStar: function (id) {
      this.$api.stars
        .destroy(id)
        .then((response) => {
          console.log(
            `DELETE ${baseURL}/stars/${id} => ${response.statusText}`
          );
          Toast.success(response.data);
        })
        .catch((error) => {
          Toast.fail(error.data.message);
        });
      // 列表更新
      this.starList = arrRemoveJson(this.starList, "id", id);
    },
    // 加载
    onLoad: function () {
      // 分页在药库做了，收藏就不做了，做一个延时异步操作
      setTimeout(() => {
        this.loading = false;
        this.finished = true;
      }, 250);
    },
  },
  mounted() {
    if (this.$store.state.token) {
      this.$api.stars
        .index()
        .then((response) => {
          console.log(`GET ${baseURL}/stars => ${response.statusText}`);
          this.starList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  components: {
    BackNav,
  },
};
</script>

<style scoped></style>
