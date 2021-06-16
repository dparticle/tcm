<template>
  <div class="search">
    <van-search
      v-model="searchContent"
      show-action
      :placeholder="recommendSearch"
      @search="onSearch"
      @cancel="onCancel"
      clearable
    />
    <!--TODO 热门搜索，未来搜索候选 -->
    <div class="hot-search">
      <p class="title">热门搜索</p>
      <van-tag
        class="tag"
        v-for="(item, index) in hotSearchList"
        :key="index"
        round
        color="#ffffff"
        text-color="#58727e"
        size="large"
      >
        {{ item }}
      </van-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
      recommendSearch: "",
      hotSearchList: "",
    };
  },
  methods: {
    onSearch: function () {
      console.log("导航栏搜索 => " + this.searchContent);
    },
    onCancel: function () {
      this.$router.back();
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
  },
};
</script>

<style scoped>
.hot-search {
  padding: 10px 16px;
}

.tag {
  margin: 6px 4px;
}
</style>
