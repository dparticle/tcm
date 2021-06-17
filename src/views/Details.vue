<template>
  <div class="details">
    <back-nav :title="title">
      <template #right>
        <van-icon
          v-if="isStar"
          class="right-icon"
          name="star"
          size="18"
          @click="onStar"
        />
        <van-icon
          v-else
          class="right-icon"
          name="star-o"
          size="18"
          @click="onStar"
        />
        <van-icon
          class="right-icon"
          name="share-o"
          size="18"
          @click="showShare = true"
        />
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
      </template>
    </back-nav>
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(img, index) in imgList" :key="index">
        <van-image class="img" height="200" :src="img" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ imgList.length }}
        </div>
      </template>
    </van-swipe>
    <home-item
      v-for="(info, index) in infoList"
      :key="index"
      :title="info.title"
    >
      <p class="item-text">{{ info.text }}</p>
    </home-item>
  </div>
</template>

<script>
import BackNav from "../components/BackNav";
import HomeItem from "../components/HomeItem";
import { Toast } from "vant";
import orm from "../util/orm";

export default {
  name: "Details",
  data() {
    return {
      isStar: false,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      infoList: [],
      title: "",
      imgList: [],
      current: 0,
    };
  },
  methods: {
    onStar: function () {
      if (this.isStar) {
        Toast("取消收藏");
      } else {
        Toast("收藏成功");
      }
      this.isStar = !this.isStar;
    },
    onChange: function (index) {
      this.current = index;
    },
    onSelect: function (option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
  mounted() {
    this.$api.tcm.show(this.$route.query.id).then((response) => {
      console.log(
        `POST /tcms/${this.$route.query.id} => ` + response.statusText
      );
      for (let key of Object.keys(response.data)) {
        if (key === "name") {
          this.title = response.data[key];
        } else if (key === "imgs") {
          this.imgList = response.data[key];
        } else if (key === "id") {
          continue;
        } else {
          this.infoList.push({
            title: orm[key],
            text: response.data[key],
          });
        }
      }
      console.log(this.infoList);
    });
  },
  components: {
    BackNav,
    HomeItem,
  },
};
</script>

<style scoped>
.details {
  background-color: #ffffff;
}

.right-icon {
  color: #646566;
  margin-left: 10px;
}

.img {
  width: 100%;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 10px;
  padding: 4px 6px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.1);
}

.item-text {
  margin: 16px 10px;
}
</style>
