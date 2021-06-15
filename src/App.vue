<template>
  <div id="app">
    <div class="content">
      <!--TODO 保存路由状态 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <bottom-bar v-show="$route.meta.bottomBarShow"></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "./components/BottomBar";

export default {
  name: "App",
  components: {
    BottomBar,
  },
  mounted() {
    console.log("App Router => mounted");
    if (this.$store.state.token) {
      this.$store.dispatch("me", this.$api);
    }
  },
};
</script>

<style>
body {
  background-color: #f7f8fa;
}

#app {
  font-family: Microsoft YaHei, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 防止内容被底部栏遮挡 */
.content {
  margin-bottom: 50px;
}
</style>
