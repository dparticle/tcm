<template>
  <div class="user">
    <user-nav />
    <user-info-cell-group />
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
    <user-options-cell-groups :cell-group-list="optionsCellGroupList" />
  </div>
</template>

<script>
import UserNav from "../components/UserNav";
import UserInfoCellGroup from "../components/UserInfoCellGroup";
import UserOptionsCellGroups from "../components/UserOptionsCellGroups";
import TreatmentClock from "../components/TreatmentClock";

export default {
  name: "User",
  data() {
    return {
      gridItems: [
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
      optionsCellGroupList: [
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
  components: {
    UserNav,
    UserInfoCellGroup,
    UserOptionsCellGroups,
    TreatmentClock,
  },
};
</script>

<style scoped></style>
