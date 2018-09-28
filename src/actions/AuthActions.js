import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

/**
 * Login basic
 * @param {*} data
 */
export const postLogin = (data = {}) => {
  return async dispatch => {
    let result = await postRequestApi(API.LOGIN, data, dispatch);

    if (result) {
      dispatch({
        type: "LOGIN",
        payload: result
      });
    }
    return result;
  };
};

/**
 * Login facebook
 *
 */
export const loginFacebook = (data = {}) => {
  return async dispatch => {
    let result = await postRequestApi(API.LOGIN_FB, data, true);
    if (result) {
      dispatch({
        type: "LOGIN",
        payload: result
      });
    }
    return result;
  };
};

/**
 * Register
 * @param {*} data
 */
export const postRegister = async (data = {}) => {
  return postRequestApi(API.REGISTER, data, true);
};
