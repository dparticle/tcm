<template>
  <div class="user">
    <!-- 导航栏 -->
    <van-nav-bar
      :border="false"
      @click-left="onNavLeftClick"
      @click-right="onNavRightClick"
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
    <!-- 用户信息栏 -->
    <van-cell-group :border="false" class="user-info">
      <van-cell
        v-if="$store.state.user"
        center
        size="large"
        :title="$store.state.user.username"
        :label="'手机号：' + $store.state.user.phone"
        is-link
        @click="toUserInfo"
      >
        <template #icon>
          <van-image
            class="avatar"
            round
            width="60"
            height="60"
            :src="$store.state.user.avatar_url"
          />
        </template>
      </van-cell>
      <van-cell v-else center size="large" title="点击登录" is-link to="/login">
        <template #icon>
          <van-image
            class="avatar"
            round
            width="60"
            height="60"
            src="https://img01.yzcdn.cn/vant/leaf.jpg"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <!--    <user-info-cell-group />-->
    <!-- 收藏、历史记录 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in gridItems"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
        :to="item.to"
      />
    </van-grid>
    <!-- 疗程打卡 -->
    <!--TODO 考虑请求后端放父/子组件 -->
    <TreatmentClock :today-status="false" treatment-title="补血疗程" />
    <!-- 我的页面其它选项 -->
    <van-cell-group
      class="user-options"
      v-for="cellGroup in cellGroupList"
      :key="cellGroup.title"
    >
      <van-cell
        v-for="cell in cellGroup.cellList"
        :key="cell.title"
        :title="cell.title"
        :icon="cell.icon"
        is-link
        :to="cell.to"
      />
      <!-- 定制其中一个用 v-if，不可行 -->
    </van-cell-group>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Toast } from "vant";

import TreatmentClock from "../../components/TreatmentClock";

library.add([faSun, faMoon, faQrcode]);

export default {
  name: "User",
  data() {
    return {
      gridItems: [
        //TODO 用户权限
        {
          id: 1,
          icon: "vip-card-o",
          text: "会员中心",
          to: undefined,
        },
        //TODO 收藏列表
        {
          id: 2,
          icon: "star-o",
          text: "我的收藏",
          to: undefined,
        },
        //TODO 历史记录
        {
          id: 3,
          icon: "browsing-history-o",
          text: "历史记录",
          to: undefined,
        },
      ],
      cellGroupList: [
        {
          title: "分组1",
          cellList: [
            {
              title: "联系客服",
              icon: "service-o",
            },
            {
              title: "意见反馈",
              icon: "comment-o",
            },
            {
              title: "设置",
              icon: "setting-o",
              to: "/setting",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onNavLeftClick: function () {
      console.log("我的页面左侧图标点击");
      //TODO 扫描二维码
      console.log("扫描二维码");
    },
    onNavRightClick: function () {
      console.log("我的页面右侧图标点击");
      if (this.$store.state.darkMode) {
        Toast("关闭暗黑模式");
      } else {
        Toast("开启暗黑模式");
      }
      this.$store.commit("REVERSE_DARKMODE");
    },
    toUserInfo: function () {
      const phone = this.$store.state.user.phone;
      this.$router.push({
        path: `/user/${phone}`,
        params: {
          phone,
        },
      });
    },
  },
  components: {
    FontAwesomeIcon,
    TreatmentClock,
  },
};
</script>

<style scoped>
/* 防止内容被底部栏遮挡 */
.user {
  margin-bottom: 50px;
}

/* 直接修改 right、left 无法生效，只能额外加 calss */
.van-nav-bar-icon {
  color: #646566;
  font-size: 16px;
}

.user-info {
  padding-bottom: 5px;
}

/* 单元格默认居中显示、调整 title 字大小 */
.user-info .van-cell__title {
  /* 和头像与左边距相同 */
  margin-left: 16px;
  font-size: 18px;
}

.user-info .van-cell__label {
  font-size: 13px;
}

.user-options {
  margin-top: 6px;
}

.user-options .van-cell-group {
  margin-bottom: 6px;
}

.user-options .van-cell__title {
  margin-left: 5px;
}
</style>
