import axios from "../util/http";
import base from "./base";

const tcms = {
  index(query) {
    return axios.get(`${base.local}/tcms?` + query);
  },
  show(id) {
    return axios.get(`${base.local}/tcms/` + id);
  },
};

export default tcms;
