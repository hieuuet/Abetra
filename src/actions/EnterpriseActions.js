import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

/**
 * get all Enterprise
 * @param {*} data
 */
export const getAllEnterprise = (data = {}) => {
  return async dispatch => {
    let result = await postRequestApi(API.ALL_ENTERPRISE, data, dispatch);

    if (result) {
      dispatch({
        type: "GET_ALL_ENTERPRISE",
        payload: result.Value
      });
    }
    return result;
  };
};
/**
 * get all Enterprise not save redux
 * @param {*} data
 */
export const getAllEnterprise2 = (data = {}) => {
  return postRequestApi(API.ALL_ENTERPRISE, data, true);
};
