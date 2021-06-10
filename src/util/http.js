import axios from "axios";
import router from "../router";
import store from "../store";
import { Toast } from "vant";

// 创建 axios 实例，并设置请求超时时间
let instance = axios.create({ timeout: 10000 });

// 跳转登录页
const toLoginRouter = () => {
  router.push({
    path: "/user/login",
    // 当前路由的一些参数
    // query: {
    //   redirect: router.currentRoute.fullPath,
    // },
  });
};

const errorHandle = (res) => {
  switch (res.status) {
    // 401: 未登录状态，跳转登录路由，egg.js token 验证失败返回也是
    case 401:
      localStorage.removeItem("token");
      store.commit("SET_TOKEN", { token: undefined });
      store.commit("SET_USER", { user: undefined });
      toLoginRouter();
      break;
    case 404:
      Toast.fail("资源不存在");
      break;
    default:
      console.log(res);
  }
};

// post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//TODO 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = store.getters.fullToken;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.reject(error)
);

//TODO 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在 2xx 的范围
      errorHandle(response);
      return Promise.reject(response);
    } else {
      //TODO 处理断网情况
    }
  }
);

export default instance;
