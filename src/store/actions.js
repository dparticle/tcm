import * as mutationsType from "./mutations-type";
import { Toast } from "vant";

export default {
  //TODO 分 user 模块
  login(context, payload) {
    console.log("vuex acions => 登录");
    payload.$api.users
      .login(payload.values)
      .then((response) => {
        console.log("POST /login => " + response.data);
        Toast.success("登录成功");
        // 设置全局状态
        context.commit(mutationsType.SET_TOKEN, {
          token: response.data,
        });
        // 设置全局用户配置，需要考虑先获取的 token，再获取的 user
        context.dispatch("me", payload.$api);
        setTimeout(() => {
          payload.$router.back();
        }, 500);
      })
      .catch((error) => {
        console.log("[ERROR] POST /login => " + error.data.message);
        Toast.fail(error.data.message);
      });
  },
  reg(context, payload) {
    console.log("vuex acions => 注册");
    // console.log(payload.values);
    // 没实现异步
    payload.$api.users
      .reg(payload.values)
      .then((response) => {
        console.log("POST /users => " + response.data);
        // 错误处理，判断是否存在某属性 in（支持继承）、hasOwnProperty（无继承）、undefined
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "注册成功\n3 秒后返回",
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `注册成功\n${second} 秒后返回`;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear();
          }
        }, 1000);

        // 登录路由自动填写手机号
        // context.commit(mutationsType.SET_USER_PHONE, {
        //   phone: payload.values.phone,
        // });
        setTimeout(() => {
          payload.$router.replace({
            path: "/login",
            query: {
              phone: payload.values.phone,
            },
          });
        }, 3000);
      })
      .catch((error) => {
        console.log("[ERROR] POST /users => " + error.data.message);
        Toast.fail(error.data.message);
      });
  },
  // 获取用户信息
  me(context, api) {
    console.log("vuex acions => 获取用户信息");
    api.users.me().then((response) => {
      console.log("GET /users/me => " + response.statusText);
      context.commit(mutationsType.SET_USER, { user: response.data });
    });
  },
};
