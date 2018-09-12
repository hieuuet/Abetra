import { AsyncStorage } from 'react-native';
import axios from 'axios';

export const getRequestApi = async (url) => {
  // let token = await AsyncStorage.getItem('token');
  let config = {
    headers: {
      'Content-Type': 'application/json',
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
      console.log('err', err);
    });
};

export const postRequestApi = async (url, data, dispatch) => {
  // let  token = await AsyncStorage.getItem('token') ? await AsyncStorage.getItem('token') : ''
  let config = {
    headers: {
      'Content-Type': 'application/json',
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
      console.log('err', err);
    });
};
