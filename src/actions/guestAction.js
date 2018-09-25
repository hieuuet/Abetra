import { Alert } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

export const loginGuest = (isGuest = true) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGIN_GUEST",
      payload: { isGuest },
    });
  };
};

export const requestRegister = (navigation) => {
  const goRegister = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Register" })],
    });
    navigation.dispatch(resetAction);
  };

  Alert.alert(
    "Thông báo",
    "Để sử dụng tính năng bạn cần đăng ký tải khoản. Đăng ký ngay ?",
    [
      { text: "Đăng ký", onPress: goRegister },
      { text: "Để sau", onPress: () => {} },
    ],
    { cancelable: false }
  );
};
