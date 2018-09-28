import { postRequestApi } from "../constant/callApi";
import { API } from "../constant/api";

export const registerPersonalMember = (data = {}) => {
  return postRequestApi(API.REGISTER_PERSONAL_MEMBER, data, true);
};

export const registerBusinessMember = (data = {}) => {
  return postRequestApi(API.REGISTER_BUSINESS_MEMBER, data, true);
};
