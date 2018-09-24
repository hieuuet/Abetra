import { strings } from "../i18n";
import { GENDER_STATE } from "./KeyConstant";
import moment from "moment";

/**
 * get string gender from state
 * @param {*0/1/2} state
 */
export const getGender = (state) => {
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
export const formatDate = (stringDate) => {
  return moment(stringDate).format("YYYY/MM/DD");
};
