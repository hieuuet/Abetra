import { combineReducers } from "redux";
import { login } from "./loginReducers";
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
import { allRank, allHashTag } from "./CommonReducers";

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
  allRank,
  allHashTag,
});

export const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
