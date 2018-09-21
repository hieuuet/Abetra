import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

/**
 * Upload list Image
 */
//KienLV comment: need to change name of function to clearly. Don't need to save to redux, Should be function normally
export const uploadImage = (data = {}) => {
  return async (dispatch) => {
    let result = await postRequestApi(API.UPLOAD_LIST_IMAGE, data, true);

    if (result) {
      dispatch({
        type: "UPLOAD_IMAGE",
        payload: result,
      });
    }
    return result;
  };
};

/**
 *
 * Upload one image each time
 */
export const uploadImage2 = (data = {}) => {
  return postRequestApi(API.UPLOAD_IMAGE, data, true);
};
