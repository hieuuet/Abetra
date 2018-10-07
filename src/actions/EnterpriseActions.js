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
        payload: result
      });
    }
    return result;
  };
};