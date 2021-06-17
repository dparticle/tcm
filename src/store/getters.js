export default {
  // 不需要加执行标识符 ()
  registerRouterInfo(state) {
    return "注册路由路径：" + state.registerRouterPath;
  },
  // 请求头完整的 token
  fullToken(state) {
    return "Bearer " + state.token;
  },
};
