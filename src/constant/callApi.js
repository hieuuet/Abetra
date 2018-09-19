import { AsyncStorage } from "react-native";
import axios from "axios";
import { LANGUAGE } from "../constant/KeyConstant";
const DefaultLanguge = "vi_VN";

export const getRequestApi = async (url) => {
  // let token = await AsyncStorage.getItem('token');
  let config = {
    headers: {
      "Content-Type": "application/json",
      // "access-token": token
    },
  };
  let timeRequest = {
    timeout: 30000,
  };

  return axios
    .get(url, config, timeRequest)
    .then((res) => {
      const response = res.data;

      return response;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const postRequestApi = async (url, data, dispatch) => {
  //Config get set for all api
  let language = await AsyncStorage.getItem(LANGUAGE);
  if (language === null) language = DefaultLanguge;
  data = { ...data, lang_name: language };
  let config = {
    headers: {
      "Content-Type": "application/json",
      // "access-token": token
    },
  };
  let timeRequest = {
    timeout: 30000,
  };

  return axios
    .post(url, data, config, timeRequest)
    .then((res) => {
      // console.log('dataRes post request', res)
      const response = res.data;
      return response;
    })
    .catch((err) => {
      console.log("err", err);
    });
};
