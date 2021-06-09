export default {
  registerRouterInfo(state) {
    return "注册路由路径：" + state.registerRouterPath;
  },
  // 请求头完整的 token
  fullToken(state) {
    return "Bearer " + state.token;
  },
};
