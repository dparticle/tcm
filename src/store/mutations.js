import * as mutationsType from "./mutations-type";

export default {
  [mutationsType.SET_ROUTER_PATH](state, payload) {
    console.log("SET_ROUTER_PATH handle, payload: " + payload.path);
    state.registerRouterPath = payload.path;
  },
  [mutationsType.SET_USER_PHONE](state, payload) {
    console.log("SET_USER_PHONE handle, payload: " + payload.phone);
    state.phone = payload.phone;
  },
  // 操作 token state 集
  [mutationsType.SET_TOKEN](state, payload) {
    console.log("SET_TOKEN handle, payload: " + payload.token);
    state.token = payload.token;
    localStorage.setItem("token", payload.token);
  },
};
