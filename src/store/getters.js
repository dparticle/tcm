export default {
  registerRouterInfo(state) {
    return "注册路由路径：" + state.registerRouterPath;
  },
  fullToken(state) {
    return "Bearer " + state.token;
  },
};
