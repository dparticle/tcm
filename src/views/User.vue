<template>
  <div class="user">
    <user-nav />
    <user-info-cell-group />
    <user-options-cell-groups />
  </div>
</template>

<script>
import UserNav from "../components/UserNav";
import UserInfoCellGroup from "../components/UserInfoCellGroup";
import UserOptionsCellGroups from "../components/UserOptionsCellGroups";

export default {
  name: "User",
  components: {
    UserNav,
    UserInfoCellGroup,
    UserOptionsCellGroups,
  },
};
</script>

<style scoped></style>
