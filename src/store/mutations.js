import * as mutationsType from "./mutations-type";

export default {
  [mutationsType.SET_ROUTER_PATH](state, payload) {
    console.log("SET_ROUTER_PATH handle, payload: " + payload.path);
    state.registerRouterPath = payload.path;
  },
  // 操作 token state 集
  [mutationsType.SET_TOKEN](state, payload) {
    console.log("SET_TOKEN handle, payload: " + payload.token);
    state.token = payload.token;
    localStorage.setItem("token", payload.token);
  },
  // 保存用户信息
  [mutationsType.SET_USER](state, payload) {
    console.log("SET_USER handle, payload: " + payload.user);
    state.user = payload.user;
  },
  // 暗黑模式开启关闭
  [mutationsType.REVERSE_DARKMODE](state) {
    console.log("REVERSE_DARKMODE handle");
    state.darkMode = !state.darkMode;
  },
};
