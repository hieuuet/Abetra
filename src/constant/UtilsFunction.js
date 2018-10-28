import { strings } from "../language/i18n";
import { GENDER_STATE } from "./KeyConstant";
import moment from "moment";
import { IMAGE } from "./assets";

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
 */
export const getRank = (PackgeID, allRank = []) => {
  if (!PackgeID || allRank.length === 0) {
    return "";
  }
  const rank = allRank.find(rank => rank.ID === PackgeID);
  return (rank && rank.RankName) || "";
};
/**
 * Get rank image from PackgeID
 */
export const getRankImage = (PackgeID, allRank = []) => {
  if (!PackgeID || allRank.length === 0) {
    return IMAGE.logo;
  }
  const rank = allRank.find(rank => rank.ID === PackgeID);
  if (!rank) return IMAGE.logo;
  switch (rank.RowNum) {
    case 1:
      return IMAGE.medal_kimcuong;
    case 2:
      return IMAGE.medal_vang;
    case 3:
      return IMAGE.medal_bac;
    case 4:
      return IMAGE.medal_dong;
  }
};

/**
 * Get rank image thumnail from PackgeID
 */
export const getRankImageThumnail = (PackgeID, allRank = []) => {
  if (!PackgeID || allRank.length === 0) {
    return IMAGE.logo;
  }
  const rank = allRank.find(rank => rank.ID === PackgeID);
  if (!rank) return IMAGE.logo;
  switch (rank.RowNum) {
    case 1:
      return IMAGE.hoivienkimcuong;
    case 2:
      return IMAGE.hoivienvang;
    case 3:
      return IMAGE.hoivienbac;
    case 4:
      return IMAGE.hoiviendong;
  }
};