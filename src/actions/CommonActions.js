import { postRequestApi, getRequestApi } from "../constant/callApi";
import { API } from "../constant/api";
import { getCurrentLanguageID } from "../constant/callApi";

/**
 * get all rank
 */
export const getAllRank = (
  data = {
    PageSize: 100,
    PageIndex: 1,
    FromDate: 0,
    ToDate: 0,
    Status: 64
  }
) => {
  return async dispatch => {
    let result = await postRequestApi(API.GET_RANK, data);

    if (result) {
      dispatch({
        type: "GET_RANK",
        payload: result.Value
      });
    }
    return result;
  };
};

/**
 * get all hashtag
 * @param {*} data
 */
export const getAllHashTag = (
  data = {
    PageSize: 100,
    PageIndex: 1,
    FromDate: 0,
    ToDate: 0
  }
) => {
  return async dispatch => {
    let result = await postRequestApi(API.GET_ALL_HASHTAG, data);

    if (result) {
      dispatch({
        type: "GET_HASHTAG",
        payload: result.Value
      });
    }
    return result;
  };
};

/**
 * get guide register
 */
export const getGuide = () => {
  return getRequestApi(API.GET_GUIDE, true);
};

/**
 * get certificate
 */
export const getCertificate = userID => {
  return getRequestApi(`${API.GET_CERTIFICATE}/${userID}`, true);
};

/**
 * get benifet
 */
export const getBenifet = () => {
  const langID = getCurrentLanguageID();
  return getRequestApi(`${API.GET_BENIFET}?langid=${langID}`, true);
};

/**
 * get image introduce app
 */
export const getImagePanel = () => {
  return getRequestApi(API.GET_IMAGE_PANEL, true);
};

/**
 * get common setting
 */
export const getcommonSetting = (data = {}, isSaveRedux = false) => {
  if (!isSaveRedux) return postRequestApi(API.GET_COMMON_SETTING, data, true);
  return async dispatch => {
    let result = await postRequestApi(API.GET_COMMON_SETTING, data);

    if (result) {
      dispatch({
        type: "GET_COMMON_SETTING",
        payload: result.Value && result.Value[0]
      });
    }
    return result;
  };
};

/**
 * get all category
 * Type	:
Loại danh mục: =1: sản phầm, =2: dịch vụ,3 Lĩnh vực hoạt động
 */
export const getAllCategory = (data = { Type: 3 }) => {
  data = {
    PageSize: 100,
    PageIndex: 1,
    Keyword: "",
    FromDate: 0,
    ToDate: 0,
    Status: 255,
    ...data
  };
  return async dispatch => {
    let result = await postRequestApi(API.GET_ALL_CATEGORY, data);

    if (result) {
      dispatch({
        type: "GET_CATEGORY_TYPE3",
        payload: result.Value && result.Value
      });
    }
    return result;
  };
};

/**
 * delete image on user profile
 */
export const deleteImage = (data = {}) => {
  return postRequestApi(API.DELETE_IMAGE, data, true);
};

/**
 * get all emoji
 */
export const getAllEmoji = () => {
  return async dispatch => {
    let result = await getRequestApi(API.GET_ALL_EMOJI, true);
    if (result) {
      dispatch({
        type: "GET_ALL_EMOJI",
        payload: result.Value && result.Value[0]
      });
    }
    return result;
  };
};

/**
 * update phone facebook
 */
export const updatePhoneFb = (data = {}) => {
  return postRequestApi(API.UPDATE_PHONE_FB, data, true);
};

/**
 * request send otp
 */
export const sendOTP = (data = {}) => {
  return postRequestApi(API.SEND_OTP, data, true);
};

/**
 * verify OTP
 */
export const verifyOTP = (data = {}) => {
  return postRequestApi(API.VERIFY_OTP, data, true);
};
