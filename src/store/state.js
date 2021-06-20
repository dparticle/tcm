export default {
  registerRouterPath: "/register", // 测试 vuex 的一个变量
  token:
    (localStorage.getItem("token") !== "undefined" &&
      localStorage.getItem("token")) ||
    undefined, // 从客户端存储中初始化，getItem 获取到的是 string
  //TODO 考虑是否可去掉，纯 token 形式
  user: undefined,
  darkMode: false,
};
