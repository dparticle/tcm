export default {
  registerRouterPath: "/register", // 测试 vuex 的一个变量
  phone: "",
  token: localStorage.getItem("token") || "", // 从客户端存储中初始化
};
