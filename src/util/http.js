import axios from "axios";

// 创建 axios 实例，并设置请求超时时间
let instance = axios.create({ timeout: 10000 });

// post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//TODO 请求拦截器
//TODO 响应拦截器

export default instance;
