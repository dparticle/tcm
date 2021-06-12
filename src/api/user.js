import axios from "../util/http";
import base from "./base";
// import qs from "qs";  // URL 解析成对象格式，对象格式解析成 URL

const user = {
  login(params) {
    return axios.post(`${base.local}/user/login`, params);
  },
  reg(params) {
    return axios.post(`${base.local}/user/reg`, params);
  },
  me() {
    return axios.get(`${base.local}/user/me`);
  },
  refreshToken(params) {
    return axios.post(`${base.local}/user/refreshToken`, params);
  },
};

export default user;
