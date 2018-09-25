import { postRequestApi } from "../constant/callApi";
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
    Status: 64,
  }
) => {
  return async (dispatch) => {
    let result = await postRequestApi(API.GET_RANK, data);

    if (result) {
      dispatch({
        type: "GET_RANK",
        payload: result.Value,
      });
    }
    return result;
  };
};

export const getAllHashTag = (
  data = {
    PageSize: 100,
    PageIndex: 1,
    FromDate: 0,
    ToDate: 0,
  }
) => {
  return async (dispatch) => {
    let result = await postRequestApi(API.GET_ALL_HASHTAG, data);

    if (result) {
      dispatch({
        type: "GET_HASHTAG",
        payload: result.Value,
      });
    }
    return result;
  };
};
