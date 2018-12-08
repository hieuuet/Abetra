import axios from "axios";
import { DEFAULT_LANGUGE } from "../constant/KeyConstant";
import store from "../store";
const randomString = length_ => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
    ""
  );
  if (typeof length_ !== "number") {
    length_ = Math.floor(Math.random() * chars.length_);
  }
  let str = "";
  for (let i = 0; i < length_; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

export const getCurrentLanguageID = () => {
  //Config get set for all api
  let language = store.getState().currentLanguage;
  if (language === null || language === undefined || !language.LangID)
    language = DEFAULT_LANGUGE;
  return language.LangID;
};

export const getRequestApi = async (url, isShowLog = false) => {
  const isConnected = store.getState().currentNetWork.isConnected;
  // console.log("get request isConnected: ", isConnected);
  if (!isConnected) {
    return store.dispatch({
      type: "SHOW_ALERT",
      payload: {
        id: randomString(10),
        isShow:true,
        content: "Mất kết nối mạng"
      }
    });
  }
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
  const isConnected = store.getState().currentNetWork.isConnected;
  // console.log("post request isConnected: ", isConnected);
  if (!isConnected) {
    return store.dispatch({
      type: "SHOW_ALERT",
      payload: {
        id: randomString(10),
        isShow:true,
        content: "Mất kết nối mạng"
      }
    });
  }

  const langID = getCurrentLanguageID();
  data = { ...data, LangID: langID };

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
