import axios from "../util/http";
import baseURL from "./base";

const stars = {
  create(params) {
    return axios.post(`${baseURL}/stars`, params);
  },
  index(params) {
    return axios.get(`${baseURL}/stars`, { params });
  },
  destroy(id) {
    return axios.delete(`${baseURL}/stars/${id}`);
  },
};

export default stars;
