import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

// KienLv comment: not need to save state of register on redux store
export const postRegister = async (data = {}) => {
  return postRequestApi(API.REGISTER, data, true);
};
export default postRegister;
