import axios from "../util/http";
import baseURL from "./base";

const recommends = {
  index(query) {
    return axios.get(`${baseURL}/recommends?` + query);
  },
};

export default recommends;
