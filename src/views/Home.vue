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
          @click="onClickGridItem(item)"
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
        <van-tabs v-model="activeName" animated>
          <van-tab title="工作状态" name="工作状态">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in articleList1"
                :key="index"
                center
                :title="item.title"
                :value="item.date"
                @click="onClickArticle(item.url)"
              />
            </van-cell-group>
          </van-tab>
          <van-tab title="时政要闻" name="时政要闻">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in articleList2"
                :key="index"
                center
                :title="item.title"
                :value="item.date"
                @click="onClickArticle(item.url)"
              />
            </van-cell-group>
          </van-tab>
          <van-tab title="各地动态" name="各地动态">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in articleList3"
                :key="index"
                center
                :title="item.title"
                :value="item.date"
                @click="onClickArticle(item.url)"
              />
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </home-item>
    </div>
  </div>
</template>

<script>
import HomeItem from "../components/HomeItem";
import RecommendCard from "../components/RecommendCard";
import { Toast } from "vant";
import qs from "qs";

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
      activeName: "工作状态",
      articleList1: [],
      articleList2: [],
      articleList3: [],
    };
  },
  methods: {
    onFocus: function () {
      this.$router.push("/search");
    },
    onClickGridItem: function (item) {
      Toast(item.text);
    },
    onClickArticle: function (url) {
      Toast("文章链接地址：\n" + url);
    },
  },
  mounted() {
    // 每日养生推荐获取
    this.$api.recommends.index({ type: "tcms" }).then((response) => {
      console.log("GET /recommends?type=tcms => " + response.statusText);
      this.recommendList = response.data;
    });
    // 热门文章推荐获取
    this.$api.recommends
      .index({ type: "articles", type_value: "工作动态" })
      .then((response) => {
        console.log(
          `GET /recommends?${qs.stringify({
            type: "articles",
            type_value: "工作动态",
          })} => ` + response.statusText
        );
        this.articleList1 = response.data;
      });
    this.$api.recommends
      .index({ type: "articles", type_value: "时政要闻" })
      .then((response) => {
        console.log(
          `GET /recommends?${qs.stringify({
            type: "articles",
            type_value: "时政要闻",
          })} => ` + response.statusText
        );
        this.articleList2 = response.data;
      });
    this.$api.recommends
      .index({ type: "articles", type_value: "各地动态" })
      .then((response) => {
        console.log(
          `GET /recommends?${qs.stringify({
            type: "articles",
            type_value: "各地动态",
          })} => ` + response.statusText
        );
        this.articleList3 = response.data;
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
  /*height: 200px;*/
  margin: 10px 4px;
}

.van-cell__title {
  flex: 3;
}

.van-cell__value {
  flex: 1;
}
</style>
