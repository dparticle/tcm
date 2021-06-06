<template>
  <div class="register">
    <BackNav :title="navTitleName"/>
  </div>
</template>

<script>
import BackNav from "../components/BackNav";

export default {
  name: "Register",
  data() {
    return {
      navTitleName: "注册",
    };
  },
  components: {
    BackNav,
  },
}
</script>

<style scoped>

</style>
