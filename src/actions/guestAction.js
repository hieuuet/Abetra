import { NavigationActions, StackActions } from "react-navigation";
import store from "../store";
import { TEXT_POPUP_GUEST } from "../language";
export const loginGuest = (isGuest = true) => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_GUEST",
      payload: { isGuest }
    });
  };
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

export const requestRegister = navigation => {
  const goRegister = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Register" })]
    });
    navigation.dispatch(resetAction);
  };
  const TEXT_POPUP = TEXT_POPUP_GUEST();

  return store.dispatch({
    type: "SHOW_ALERT",
    payload: {
      id: randomString(10),
      isShow:true,
      labelSubmit: TEXT_POPUP.RegisterNow,
      labelClose: TEXT_POPUP.Later,
      content: TEXT_POPUP.GuestToRegister,
      onSubmit: goRegister
    }
  });
};
