import axios from "../util/http";
import baseURL from "./base";

const verifications = {
  create(params) {
    return axios.post(`${baseURL}/verifications`, params);
  },
};

export default verifications;
