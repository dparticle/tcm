import axios from "../util/http";
import baseURL from "./base";

const tcms = {
  index(params) {
    return axios.get(`${baseURL}/tcms`, { params });
  },
  show(id) {
    return axios.get(`${baseURL}/tcms/` + id);
  },
};

export default tcms;
