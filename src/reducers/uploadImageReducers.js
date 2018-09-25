export const uploadImage = (state = [], action = {}) => {
  switch (action.type) {
    case "UPLOAD_IMAGE":
      return action.payload;
    default:
      return state;
  }
};
