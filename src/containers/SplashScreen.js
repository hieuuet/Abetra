import React, { Component } from "react";
import { View, AsyncStorage, Image } from "react-native";
import { IMAGE } from "../constant/assets";
import { USER_ID, FIRST_INSTALL } from "../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkLoginNavigate();
  }
  checkLoginNavigate = async () => {
    const isFirstInstall = await AsyncStorage.getItem(FIRST_INSTALL);
    let routerName = "Login";
    if (isFirstInstall === null) {
      routerName = "Intro";
    } else {
      const userID = await AsyncStorage.getItem(USER_ID);
      if (userID) routerName = "TabHome";
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routerName })],
    });
    this.props.navigation.dispatch(resetAction);
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={IMAGE.logo}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
    );
  }
}
export default SplashScreen;
