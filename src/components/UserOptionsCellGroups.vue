<template>
  <div class="user-options">
    <van-cell-group v-for="cellGroup in cellGroupList" :key="cellGroup.title">
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
export default {
  name: "UserOptionsCellGroups",
  props: {
    cellGroupList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.user-options {
  margin-top: 6px;
}

.van-cell-group {
  margin-bottom: 6px;
}

.van-cell__title {
  margin-left: 5px;
}
</style>
