<template>
  <div class="home">
    <!-- 首页头部 -->
    <div class="header">
      <van-row>
        <van-col span="4" class="col-logo">
          <van-image
            width="36"
            height="36"
            :src="require('../assets/logo.png')"
            style="margin: auto"
          />
        </van-col>
        <van-search placeholder="请输入搜索关键词" @focus="onFocus" />
      </van-row>
    </div>
    <div class="content">
      <!-- 轮播图 -->
      <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="image in swipeImages" :key="image.id">
          <van-image height="150" :src="image.src" />
        </van-swipe-item>
      </van-swipe>
      <!-- 四个中药相关的宫格（仅前端） -->
      <van-grid :border="false">
        <van-grid-item
          v-for="item in gridItems"
          :key="item.id"
          :text="item.text"
          :to="item.to"
        >
          <template #icon>
            <van-image width="28" height="28" :src="item.src" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 今日养生，每天都有爱自己 -->
      <home-item title="今日养生" describe="每天学会养生招">
        <div class="daily-health">
          <van-row gutter="20">
            <van-col
              v-for="(item, index) in recommendList"
              :key="index"
              span="12"
            >
              <recommend-card :info="item" />
            </van-col>
          </van-row>
        </div>
      </home-item>
      <!-- 热文推荐，每天都有新发现 list -->
      <home-item title="热文推荐" describe="每天都有新发现">
        <!--TODO 一个 cell-group -->
        <van-cell-group>
          <van-cell
            v-for="(item, index) in articleList"
            :key="index"
            center
            :title="item.title"
            :value="item.date"
            :url="item.url"
          />
        </van-cell-group>
      </home-item>
    </div>
  </div>
</template>

<script>
import HomeItem from "../components/HomeItem";
import RecommendCard from "../components/RecommendCard";

export default {
  name: "Home",
  data() {
    return {
      swipeImages: [
        {
          id: 1,
          src: require("../assets/swipe-1.jpg"),
        },
        {
          id: 2,
          src: require("../assets/swipe-1.jpg"),
        },
        {
          id: 3,
          src: require("../assets/swipe-1.jpg"),
        },
        {
          id: 4,
          src: require("../assets/swipe-1.jpg"),
        },
      ],
      gridItems: [
        {
          id: 1,
          text: "古籍",
          to: undefined,
          src: require("../assets/book.png"),
        },
        {
          id: 2,
          text: "穴位",
          to: undefined,
          src: require("../assets/acupoint.png"),
        },
        {
          id: 3,
          text: "方剂",
          to: undefined,
          src: require("../assets/prescription.png"),
        },
        {
          id: 4,
          text: "百科",
          to: undefined,
          src: require("../assets/encyclopedia.png"),
        },
      ],
      recommendList: [],
      articleList: [],
    };
  },
  methods: {
    onFocus: function () {
      this.$router.push("/search");
    },
  },
  mounted() {
    // 每日养生推荐获取
    this.$api.tcms.getCommendTcm().then((response) => {
      console.log("GET /recommend/tcm => " + response.statusText);
      this.recommendList = response.data;
    });
    // 热门文章推荐获取
    this.$api.tcms.getCommendArticle().then((response) => {
      console.log("GET /recommend/article => " + response.statusText);
      this.articleList = response.data;
    });
  },
  components: {
    HomeItem,
    RecommendCard,
  },
};
</script>

<style scoped>
.col-logo {
  display: flex;
  justify-content: center;
  height: 54px;
  background-color: #ffffff;
}

/* 防止内容被底部栏遮挡 */
.home {
  margin-bottom: 50px;
}

.daily-health {
  height: 200px;
  margin: 10px 4px;
}

.van-cell__title {
  flex: 3;
}

.van-cell__value {
  flex: 1;
}
</style>
