import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

export const loadUserProfile = (data = {}) => {
  return async (dispatch) => {
    let result = await postRequestApi(API.LOAD_USER_PROFILE, data);

    if (result) {
      dispatch({
        type: "LOAD_USER_PROFILE",
        payload: result,
      });
    }
    return result;
  };
};

export const updateUserProfile = (data = {}) => {
  return postRequestApi(API.UPDATE_USER_PROFILE, data, true);
};

export const loadProfileMember = (data = {}) => {
  return postRequestApi(API.LOAD_USER_PROFILE, data, true);
};
