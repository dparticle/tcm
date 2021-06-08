import axios from "../util/http";
import base from "./base";
// import qs from "qs";  // URL 解析成对象格式，对象格式解析成 URL

const tcm = {
  getImgUrls(params) {
    return axios.post(`${base.local}/tcm/img`, params);
  },
};

export default tcm;
