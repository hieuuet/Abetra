export const URL_BASE = "http://123.16.53.210:9000";
export const URL_REALTIME = "http://123.16.53.210:9005";
export const URL_SOCKET = "http://123.16.53.210:9006/";
export const API = {
  //user

  REGISTER: `${URL_BASE}/api/Users/Regrister`,
  LOGIN: `${URL_BASE}/api/UserBase/Login`,
  LOAD_USER_PROFILE: `${URL_BASE}/api/Users/LoadUserProfile`,
  UPDATE_USER_PROFILE: `${URL_BASE}/api/Users/UpdateProfile`,
  UPDATE_ADDRESS_DESSCRIPTION: `${URL_BASE}/api/Users/UpdateProfileAddresDes`,

  //login fb
  LOGIN_FB: `${URL_BASE}/api/Users/RegristerLoginFB`,

  //post
  CREATE_POST: `${URL_BASE}/api/Post/CreatePost`,
  GET_TOP_POST: `${URL_BASE}/api/Post/GetTopPost`,
  SEARCH_POST: `${URL_BASE}/api/Post/SearchPost`,
  LOAD_SAVE_POST: `${URL_REALTIME}/socket/loadsavepost`,
  SAVE_POST: `${URL_REALTIME}/socket/savepost`,

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
  GET_LANGUAGE: `${URL_BASE}/Common/GetAllLanguage`,

  //Rank
  GET_RANK: `${URL_BASE}/Rank/Getall`,
  //Hashtah
  GET_ALL_HASHTAG: `${URL_BASE}/Common/GetAllHashTag`,
  //change pass
  CHANGE_PASS: `${URL_BASE}/api/Users/ChangePassword`,
  //event
  ADD_EVENT: `${URL_BASE}/Event/AddOrUpdate`,
  GET_EVENT: `${URL_BASE}/Event/GetAll`,
  DEL_EVENT: `${URL_BASE}/Event/Delete`,
  JOIN_EVENT: `${URL_BASE}/Event/EventJoin`,
  GET_EVENT_JOIN: `${URL_BASE}/Event/GetAllEventReg`,
  // register member
  REGISTER_PERSONAL_MEMBER: `${URL_BASE}/api/Users/InsertProfileUser`,
  REGISTER_BUSINESS_MEMBER: `${URL_BASE}/api/Users/InsertProfileEnterprise`,

  //common
  GET_BENIFET: `${URL_BASE}/api/Common/GetQuyenLoi`,
  GET_CERTIFICATE: `${URL_BASE}/api/Common/GetChungchi`,
  GET_GUIDE: `${URL_BASE}/api/Common/GetHuongDan`,
  GET_IMAGE_PANEL: `${URL_BASE}/api/Common/GetAllImagePanel`
};
