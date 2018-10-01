import axios from "axios";
import { DEFAULT_LANGUGE } from "../constant/KeyConstant";
import store from "../store";

export const getRequestApi = async (url, isShowLog = false) => {
  // let token = await AsyncStorage.getItem('token');
  let config = {
    headers: {
      "Content-Type": "application/json"
      // "access-token": token
    }
  };
  let timeRequest = {
    timeout: 30000
  };

  return axios
    .get(url, config, timeRequest)
    .then(res => {
      const response = res.data;
      if (isShowLog === true) {
        console.log(
          `%cCall Api GET ${url}:\n`,
          "color: #009933;font-size: 15px;",
          {
            response: res.data
          }
        );
      }
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postRequestApi = async (url, data, isShowLog = false) => {
  //Config get set for all api
  let language = store.getState().currentLanguage;
  if (language === null || language === undefined || !language.LangID)
    language = DEFAULT_LANGUGE;
  data = { ...data, LangID: language.LangID };

  let config = {
    headers: {
      "Content-Type": "application/json"
      // "access-token": token
    }
  };
  let timeRequest = {
    timeout: 30000
  };

  return axios
    .post(url, data, config, timeRequest)
    .then(res => {
      if (isShowLog === true) {
        console.log(
          `%cCall Api Post ${url}:\n`,
          "color: #009933;font-size: 15px;",
          {
            input: data,
            response: res.data
          }
        );
      }
      const response = res.data;
      return response;
    })
    .catch(err => {
      console.log("err", err);
    });
};
