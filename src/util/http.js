import axios from "axios";
// import router from "../router";
import store from "../store";
import api from "../api";
import { Toast } from "vant";
import { getExpires, getPhone } from "./util";

// 跳转登录页
// const toLoginRouter = () => {
//   router.push({
//     path: "/user/login",
//     // 当前路由的一些参数
//     // query: {
//     //   redirect: router.currentRoute.fullPath,
//     // },
//   });
// };

// 是否正在刷新的标志
window.isRefreshing = false;
// 存储请求的数组
let cacheRequestArr = [];

// 将所有的请求都 push 到数组中,其实数组是 [function(token){}, function(token){},...]
function cacheRequestArrHandle(cb) {
  cacheRequestArr.push(cb);
}

// 数组中的请求得到新的 token 之后自执行，用新的 token 去重新发起请求
function afreshRequest(token) {
  cacheRequestArr.map((cb) => cb(token));
}

// 判断 token 是否即将过期或过期不久
function isTokenExpired() {
  // 注意月份减 1
  // let curTime = new Date(2021, 5, 14, 1, 11, 0).getTime();
  let curTime = new Date().getTime();
  let expiresTime = getExpires();
  // 过期前后 20 分钟
  return Math.abs(curTime - expiresTime) <= 1200000;
}

const errorHandle = (res) => {
  switch (res.status) {
    // 401: 未登录状态，跳转登录路由，egg.js token 验证失败返回也是
    case 401:
      localStorage.removeItem("token");
      store.commit("SET_TOKEN", { token: undefined });
      store.commit("SET_USER", { user: undefined });
      // toLoginRouter();
      Toast("请登录");
      break;
    case 404:
      Toast.fail("资源不存在");
      break;
    default:
      console.log(res);
  }
};

// 创建 axios 实例，并设置请求超时时间
let instance = axios.create({ timeout: 10000 });

// post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//TODO 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers.Authorization = store.getters.fullToken;

      // 判断 token 是否即将过期，且不是请求刷新 token 的接口
      if (isTokenExpired() && config.url.indexOf("/user/refreshToken") === -1) {
        console.log(`${config.url} 响应拦截器 => token 即将过期`);
        // 请求来了，先判断是否正在刷新 token
        // 如果不是，将刷新 token 标志置为 true 并请求刷新 token.
        // 如果是，则先将请求缓存到数组中，等到刷新完 token 后再次重新请求之前缓存的请求接口
        if (!window.isRefreshing) {
          console.log(`${config.url} 响应拦截器 => 请求此接口时未在更新 token`);
          // 标志改为true，表示正在刷新
          window.isRefreshing = true;
          // 更新 token
          api.user
            .refreshToken({ phone: getPhone() })
            .then((response) => {
              console.log("POST /user/refreshToken => " + response.data);
              store.commit("SET_TOKEN", { token: response.data });
              config.headers.Authorization = store.getters.fullToken;
              afreshRequest(store.getters.fullToken);
            })
            .catch((error) => {
              console.log("[ERROR]POST /user/refreshToken => " + error);
              //TODO 未知 bug 情况

              // store.dispatch("resetUserCookies").then(() => {
              //   location.reload(); // 为了重新实例化 vue-router 对象 避免 bug
              // });
            })
            .finally(() => {
              window.isRefreshing = false;
            });

          // 下面这段代码一定要写，不然第一个请求的接口带过去的 token 还是原来的，要将第一个请求也缓存起来
          return new Promise((resolve) => {
            cacheRequestArrHandle((token) => {
              config.headers.Authorization = token;
              // 将请求挂起
              resolve(config);
            });
          });
        } else {
          console.log(`${config.url} 响应拦截器 => 请求此接口时正在更新 token`);
          return new Promise((resolve) => {
            cacheRequestArrHandle((token) => {
              config.headers.Authorization = token;
              // 将请求挂起
              resolve(config);
            });
          });
        }
      } else {
        return config;
      }
    }
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
      Toast.fail("网络错误");
    }
  }
);

export default instance;
