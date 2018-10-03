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
