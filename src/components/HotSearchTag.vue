<template>
  <span class="tag" @click="onClick">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "HotSearchTag",
  props: {
    text: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    onClick: function () {
      console.log("热门搜索填充至搜索框");
      // 子组件调用父组件方法
      this.$parent.changeSearchContent(this.text);
    },
  },
};
</script>

<style scoped>
.tag {
  /* float 布局 */
  /*float: left;*/
  /* flex 布局 */
  display: inline-flex;
  align-items: center;
  /* 背景色 */
  background: #ffffff;
  /* 字体颜色 */
  color: #58727e;
  margin: 6px 4px;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 14px;
}
</style>
