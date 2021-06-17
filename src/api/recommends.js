import axios from "../util/http";
import base from "./base";

const recommends = {
  index(query) {
    return axios.get(`${base.local}/recommends?` + query);
  },
};

export default recommends;
