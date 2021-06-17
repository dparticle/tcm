import axios from "../util/http";
import base from "./base";
// import qs from "qs";  // URL 解析成对象格式，对象格式解析成 URL

const tcms = {
  index(query) {
    return axios.get(`${base.local}/tcms?` + query);
  },
  show(id) {
    return axios.get(`${base.local}/tcms/` + id);
  },
  getCommendTcm() {
    return axios.get(`${base.local}/recommend/tcm`);
  },
  getCommendArticle() {
    return axios.get(`${base.local}/recommend/article`);
  },
};

export default tcms;
