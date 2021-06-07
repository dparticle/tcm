import { EDIT_ROUTER_PATH } from "./mutations-type";
export default {
  [EDIT_ROUTER_PATH](state, payload) {
    console.log("EDIT_ROUTER_PATH handle, payload: " + payload);
    state.registerRouterPath = payload.path;
  },
};
