import { strings } from "../language/i18n";
import { GENDER_STATE } from "./KeyConstant";
import moment from "moment";
import store from "../../src/store/index";

/**
 * get string gender from state
 * @param {*0/1/2} state
 */
export const getGender = state => {
  if (typeof state !== "number" || state === null || state === undefined) {
    state = 2;
  }
  switch (state) {
    case GENDER_STATE.MAN:
      return strings("profile.man");
    case GENDER_STATE.WOMEN:
      return strings("profile.women");
    default:
      return strings("profile.undefined");
  }
};

/**
 * format date
 * @param {param date} stringDate
 */
export const formatDate = stringDate => {
  return moment(stringDate).format("YYYY/MM/DD");
};

/**
 * Get rank from PackgeID
 *
CreateDate: "2018-09-06T17:28:17.25"
ID: 13
Icon: "http://123.16.53.210:9001/upload/737/images/rank/medal_kimcuong.png"
Icon2: "http://123.16.53.210:9001/upload/737/images/rank/hoivienkimcuong.png"
LangID: 129
Point: 500000
Price: 5000
RankName: "Hạng kim cương"
RowNum: 1
Status: 1
Summary: "<p>Hạng kim cương</p>↵"
TotalRow: 4
 */
export const getRank = (PackgeID, allRank = []) => {
  if (!PackgeID || allRank.length === 0) {
    return undefined;
  }
  return allRank.find(rank => rank.ID === PackgeID);
};

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
/**
 *
 * @param dataAlert= {title, message, submitFunc, cancelFunc}
 */
export const showAlert = (dataAlert = {}) => {
  const id = randomString(10);
  return store.dispatch({
    type: "SHOW_ALERT",
    payload: { id, ...dataAlert }
  });
};
export const closeAlert = () => {
  const id = randomString(10);
  return store.dispatch({
    type: "CLOSE_ALERT",
    payload: { id }
  });
};
