import { getRequestApi } from "../constant/callApi";
import { API } from "../constant/api";
import { LANGUAGE, DEFAULT_LANGUGE } from "../constant/KeyConstant";
import { AsyncStorage } from "react-native";

export const getAllLanguage = () => {
  return getRequestApi(API.GET_LANGUAGE, true);
};

export const getCurrentLanguage = () => {
  return async dispatch => {
    let language = await AsyncStorage.getItem(LANGUAGE);
    if (language === null) language = DEFAULT_LANGUGE;
    else language = JSON.parse(language);
    dispatch({
      type: "GET_CURRENT_LANGUAGE",
      payload: language
    });
  };
};
