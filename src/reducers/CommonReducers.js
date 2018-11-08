export const currentNetWork = (state = { isConnected: true }, action = {}) => {
  switch (action.type) {
    case "NETWORK_CHANGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const allRank = (state = [], action = {}) => {
  switch (action.type) {
    case "GET_RANK":
      return action.payload;
    default:
      return state;
  }
};

export const allHashTag = (state = [], action = {}) => {
  switch (action.type) {
    case "GET_HASHTAG":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const commonSetting = (state = {}, action = {}) => {
  switch (action.type) {
    case "GET_COMMON_SETTING":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const categoryType3 = (state = [], action = {}) => {
  switch (action.type) {
    case "GET_CATEGORY_TYPE3":
      return action.payload;
    default:
      return state;
  }
};
export const allEmoji = (state = {}, action = {}) => {
  switch (action.type) {
    case "GET_ALL_EMOJI":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const dataAlert = (
  state = {
    title: undefined,
    message: undefined,
    positive: undefined,
    negative: undefined
  },
  action = {}
) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return action.payload;
    default:
      return state;
  }
};
