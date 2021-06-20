import axios from "../util/http";
import baseURL from "./base";

const recommends = {
  // get 传參需要格式是 { params: params }
  index(params) {
    return axios.get(`${baseURL}/recommends`, { params });
  },
};

export default recommends;
