import axios from "../util/http";
import baseURL from "./base";
// import qs from "qs";  // URL 解析成对象格式，对象格式解析成 URL

const users = {
  login(params) {
    return axios.post(`${baseURL}/login`, params);
  },
  reg(params) {
    return axios.post(`${baseURL}/users`, params);
  },
  me() {
    return axios.get(`${baseURL}/users/me`);
  },
  refreshToken(params) {
    return axios.post(`${baseURL}/users/refreshToken`, params);
  },
};

export default users;
