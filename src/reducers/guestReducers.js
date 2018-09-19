export const loginGuest = (state = { isGuest: false }, action = {}) => {
  switch (action.type) {
    case "LOGIN_GUEST":
      return action.payload;
    default:
      return state;
  }
};
