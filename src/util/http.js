import axios from "axios";
import store from "../store";

// 创建 axios 实例，并设置请求超时时间
let instance = axios.create({ timeout: 10000 });

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
  (error) => {
    Promise.error(error);
  }
);

//TODO 响应拦截器

export default instance;
