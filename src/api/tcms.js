import axios from "../util/http";
import baseURL from "./base";

const tcms = {
  index(query) {
    return axios.get(`${baseURL}/tcms?` + query);
  },
  show(id) {
    return axios.get(`${baseURL}/tcms/` + id);
  },
};

export default tcms;
