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
    <div class="info-list">
      <home-item
        v-for="(info, index) in infoList"
        :key="index"
        :title="info.title"
      >
        <p class="item-text">{{ info.text }}</p>
      </home-item>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav";
import HomeItem from "../components/HomeItem";
import { Toast } from "vant";
import orm from "../util/orm";
import baseURL from "../api/base";

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
        this.$api.stars
          .destroy(this.$route.params.id)
          .then((response) => {
            console.log(
              `DELETE ${baseURL}/stars/${this.$route.params.id} => ${response.statusText}`
            );
            Toast.success(response.data);
          })
          .catch((error) => {
            Toast.fail(error.data.message);
          });
      } else {
        this.$api.stars
          .create({ tcm_id: this.$route.params.id })
          .then((response) => {
            console.log(`POST ${baseURL}/stars => ${response.statusText}`);
            Toast.success(response.data);
          })
          .catch((error) => {
            Toast.fail(error.data.message);
          });
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
    // 是否收藏获取
    this.$api.stars
      .index({ tcm_id: this.$route.params.id })
      .then((response) => {
        console.log(
          `GET ${baseURL}/stars?tcm_id=${this.$route.params.id} => ${response.statusText}`
        );
        this.isStar = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // 详细信息获取
    this.$api.tcms.show(this.$route.params.id).then((response) => {
      console.log(
        `POST /tcms/${this.$route.params.id} => ` + response.statusText
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
  margin: 8px 10px 16px;
}

.info-list {
  padding-bottom: 20px;
}
</style>
