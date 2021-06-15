<template>
  <div class="search">
    <van-search
      v-model="searchContent"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      clearable
    />
    <!--TODO 热门搜索，未来搜索候选 -->
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
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
};
</script>

<style scoped></style>
