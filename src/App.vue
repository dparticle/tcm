<template>
  <div id="app">
    <div id="content">
      <div id="router-link">
        <router-link to="/"></router-link>
        <router-link to="/storehouse"></router-link>
        <router-link to="/user"></router-link>
        <router-link to="/test"></router-link>
      </div>
      <router-view />
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "./components/BottomBar";

export default {
  name: "App",
  components: {
    BottomBar,
  },
};
</script>

<style>
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
