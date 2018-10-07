import { postRequestApi, getRequestApi } from "../constant/callApi";
import { API } from "../constant/api";
/**
 * search all
 */
export const searchAll = (data = {}) => {
  return postRequestApi(API.SEARCH_ALL, data, true);
};
