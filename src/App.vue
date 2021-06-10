<template>
  <div id="app">
    <div id="content">
      <router-view />
    </div>
    <bottom-bar v-show="$route.meta.bottomBarShow !== undefined"></bottom-bar>
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
    /**
     * TODO token 过期只做在没有活跃的时候，如果用户在活跃，过期前一段时间（全局定时器）自动更新 token，
     * token 可以在前端解析过期时间，base64
     */
    console.log("App Router: mounted");
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
  text-align: center;
  color: #2c3e50;
}

#content {
  margin-bottom: 50px;
}
</style>
