export const resetStore = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_STORE",
    });
  };
};
