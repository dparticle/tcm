import * as mutationsType from "./mutations-type";
import { Toast } from "vant";

export default {
  //TODO 分 user 模块
  login(context, payload) {
    payload.$api.user.login(payload.values).then((response) => {
      if (response.data.state) {
        Toast.success(response.data.message);
        setTimeout(() => {
          payload.$router.push("/user");
        }, 500);
      } else {
        Toast.fail(response.data.message);
      }
    });
  },
  reg(context, payload) {
    console.log(payload.values);
    // 没实现异步
    payload.$api.user.reg(payload.values).then((response) => {
      // console.log(response);
      // 错误处理，判断是否存在某属性 in（支持继承）、hasOwnProperty（无继承）、undefined
      console.log(response.data.error);
      if (response.data.error !== undefined) {
        Toast.fail(response.data.error);
      } else {
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
        context.commit(mutationsType.SET_USER_PHONE, {
          phone: payload.values.phone,
        });
        setTimeout(() => {
          payload.$router.push("/user/login");
        }, 3000);
      }
    });
  },
};
