import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

export const searchPost = (data = {}) => {
  return async dispatch => {
    let result = await postRequestApi(API.SEARCH_POST, data, dispatch);

    if (result) {
      dispatch({
        type: "SEARCH_POST",
        payload: result
      });
    }
    return result;
  };
};
/**
 * search not save redux
 * @param {*} data
 */
export const searchPost2 = (data = {}) => {
  return postRequestApi(API.SEARCH_POST, data, true);
};
