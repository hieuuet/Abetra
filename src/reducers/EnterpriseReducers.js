export const allEnterprise = (state = [], action = {}) => {
  switch (action.type) {
    case "GET_ALL_ENTERPRISE":
      return action.payload;
    default:
      return state;
  }
};
