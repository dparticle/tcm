import axios from "../util/http";
import base from "./base";
// import qs from "qs";  // URL 解析成对象格式，对象格式解析成 URL

const tcm = {
  rough(params) {
    return axios.post(`${base.local}/tcm/rough`, params);
  },
  getInfo(params) {
    return axios.post(`${base.local}/tcm`, params);
  },
};

export default tcm;
