import { combineReducers } from "redux";
import { login } from "./AuthReducers";
import { loadUserProfile } from "./UserProfileReducers";
import { createMsgGroup } from "./createMsgGroupReducers";
import { loadMsgGroup } from "./loadMsgGroupReducers";
import { detailMsg } from "./detailMsgReducers";
import { getTopPost } from "./getTopPostReducers";
import { createPost } from "./createPostReducers";
import { createCmt } from "./createCmtReducers";
import { searchCmt } from "./searchCmtReducers";
import { uploadImage } from "./uploadImageReducers";
import { searchPost } from "./searchPostReducers";
import { loginGuest } from "./guestReducers";
import { currentLanguage } from "./LanguageReducers";

import { loadSavePost, savePost, unsavePost } from "./loadSavePostReducers";

import {
  allRank,
  allHashTag,
  commonSetting,
  categoryType3,
  allEmoji,
  currentNetWork,
  showAlert,
  closeAlert
} from "./CommonReducers";
import { getEvent, getEventJoin } from "./getEventReducers";
import { addEvent } from "./addEventReducers";
import { joinEvent } from "./joinEventReducers";
import { likePost } from "./likePostReducers";
import { allEnterprise } from "./EnterpriseReducers";

const appReducer = combineReducers({
  login,
  loadUserProfile,
  createMsgGroup,
  loadMsgGroup,
  detailMsg,
  getTopPost,
  createPost,
  createCmt,
  searchCmt,
  uploadImage,
  searchPost,
  loginGuest,
  currentLanguage,
  loadSavePost,
  allRank,
  allHashTag,
  savePost,
  unsavePost,
  getEvent,
  addEvent,
  joinEvent,
  getEventJoin,
  commonSetting,
  likePost,
  categoryType3,
  allEmoji,
  allEnterprise,
  currentNetWork,
  showAlert,
  closeAlert
});

export const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
