import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

export const loadUserProfile = (data = {}) => {
  return async (dispatch) => {
    data = {
      user_id: "2C6E403D-D01B-4B3B-920C-BC04E21F502C",
      option: 100,
    };
    let result = await postRequestApi(API.LOAD_USER_PROFILE, data, true);

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
