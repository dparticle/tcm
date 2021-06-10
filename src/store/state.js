export default {
  registerRouterPath: "/register", // 测试 vuex 的一个变量
  token: localStorage.getItem("token") || undefined, // 从客户端存储中初始化
  user: undefined,
  darkMode: false,
};
