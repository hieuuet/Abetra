import { postRequestApi, getRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

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
export const getCertificate = () => {
  return getRequestApi(API.GET_CERTIFICATE, true);
};

/**
 * get benifet
 */
export const getBenifet = () => {
  return getRequestApi(API.GET_BENIFET, true);
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
    PageSize: 1,
    PageIndex: 2,
    FromDate: 0,
    ToDate: 0,
    Status: 64,
    ...data
  };
  return async dispatch => {
    let result = await postRequestApi(API.GET_ALL_CATEGORY, data);

    if (result) {
      dispatch({
        type: "GET_CATEGORY_TYPE3",
        payload: result.Value && result.Value[0]
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
