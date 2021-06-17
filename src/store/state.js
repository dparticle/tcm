export default {
  registerRouterPath: "/register", // 测试 vuex 的一个变量
  token:
    (localStorage.getItem("token") !== "undefined" &&
      localStorage.getItem("token")) ||
    undefined, // 从客户端存储中初始化，getItem 获取到的是 string
  user: undefined,
  darkMode: false,
};
