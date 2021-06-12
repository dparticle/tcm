<template>
  <div id="app">
    <div id="content">
      <router-view />
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
  text-align: center;
  color: #2c3e50;
}

#content {
  margin-bottom: 50px;
}
</style>
