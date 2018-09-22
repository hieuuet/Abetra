import { DEFAULT_LANGUGE } from "../constant/KeyConstant";

export const currentLanguage = (state = DEFAULT_LANGUGE, action = {}) => {
  switch (action.type) {
    case "GET_CURRENT_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
};
