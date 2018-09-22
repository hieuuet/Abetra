export const URL_BASE = "http://123.16.53.210:9000";
export const URL_REALTIME = "http://123.16.53.210:9005";
export const URL_SOCKET = "http://123.16.53.210:9006";
export const API = {
  //user

  REGISTER: `${URL_BASE}/api/Users/Regrister`,
  LOGIN: `${URL_BASE}/api/UserBase/Login`,
  LOAD_USER_PROFILE: `${URL_BASE}/api/Users/LoadUserProfile`,
  UPDATE_USER_PROFILE: `${URL_BASE}/api/Users/UpdateProfile`,

  //post
  CREATE_POST: `${URL_BASE}/api/Post/CreatePost`,
  GET_TOP_POST: `${URL_BASE}/api/Post/GetTopPost`,
  SEARCH_POST: `${URL_BASE}/api/Post/SearchPost`,
  //cmt
  CREATE_CMT: `${URL_BASE}/api/Comment/CreateComment`,
  SEARCH_CMT: `${URL_BASE}/api/Comment/SearchComment`,

  //Image
  UPLOAD_LIST_IMAGE: `${URL_BASE}/api/FaceHomeIO/UploadListImage`,
  UPLOAD_IMAGE: `${URL_BASE}/api/FaceHomeIO/UploadImage`,

  //Api realtime
  CREATE_MSG_GROUP: `${URL_REALTIME}/socket/createmsggroups`,
  LOAD_MSG_GROUP: `${URL_REALTIME}/socket/loadmgsgroups`,
  DETAIL_MSG: `${URL_REALTIME}/socket/detailmessagebygroup`,

  //Language
  GET_LANGUAGE: `${URL_REALTIME}/Common/GetAllLanguage`,
};
