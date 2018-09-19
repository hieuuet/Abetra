import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

export const postLogin = (data = {}) => {
  return async (dispatch) => {
    let result = await postRequestApi(API.LOGIN, data, dispatch);

    if (result) {
      dispatch({
        type: "LOGIN",
        payload: result,
      });
    }
    return result;
  };
};

