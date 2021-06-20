<template>
  <div class="search">
    <!--TODO 搜索候选 -->
    <van-search
      v-model="searchContent"
      show-action
      :placeholder="recommendSearch"
      @search="onSearch"
      @cancel="onCancel"
      clearable
    />
    <div class="history">
      <p class="title">历史搜索</p>
      <hot-search-tag
        v-for="(item, index) in historyList"
        :key="index"
        :text="item"
      />
    </div>
    <div class="hot-search">
      <p class="title">热门搜索</p>
      <hot-search-tag
        v-for="(item, index) in hotSearchList"
        :key="index"
        :text="item"
      />
    </div>
  </div>
</template>

<script>
import HotSearchTag from "../components/HotSearchTag";

export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
      recommendSearch: "",
      historyList: [],
      hotSearchList: [],
    };
  },
  methods: {
    onSearch: function () {
      console.log("导航栏搜索 => " + this.searchContent);
      this.searchContent = this.recommendSearch;
    },
    onCancel: function () {
      this.$router.back();
    },
    changeSearchContent: function (val) {
      console.log("子组件调用父组件方法");
      this.searchContent = val;
    },
  },
  mounted() {
    //TODO 后端接口
    this.recommendSearch = "鸡骨草";
    this.hotSearchList = [
      "五加皮",
      "牛膝",
      "木通",
      "预知子",
      "合欢花",
      "泽泻",
      "韭菜子",
      "知母",
    ];
    this.historyList = ["鸡骨草", "白及", "土贝母"];
  },
  components: {
    HotSearchTag,
  },
};
</script>

<style scoped>
.history,
.hot-search {
  /* 清除 float */
  /*clear: both;*/
  padding: 10px 16px;
}
</style>
