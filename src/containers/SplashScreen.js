import React, { Component } from "react";
import { View, AsyncStorage, Image } from "react-native";
import { IMAGE } from "../constant/assets";
import { USER_ID, FIRST_INSTALL } from "../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";
import { getAllLanguage, getCurrentLanguage, getImagePanel } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentLanguage();
    this.checkLoginNavigate();
  }
  checkLoginNavigate = async () => {
    const isFirstInstall = await AsyncStorage.getItem(FIRST_INSTALL);
    let routerName = "Login";
    let allLanguage = [];
    let arrSlide = [];
    if (isFirstInstall === null) {
      routerName = "Intro";
      allLanguage = await getAllLanguage().then(data => data.Value || []);
      arrSlide = await getImagePanel().then(data => data.Value || []);
    } else {
      const userID = await AsyncStorage.getItem(USER_ID);
      if (userID) routerName = "TabHome";
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routerName,
          params: { allLanguage, arrSlide }
        })
      ]
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
          alignItems: "center"
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLanguage: bindActionCreators(getCurrentLanguage, dispatch)
  };
};

SplashScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
export default SplashScreen;
