import React, { Component } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { USER_ID, FIRST_INSTALL } from "../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";
import { getAllLanguage, getCurrentLanguage, getImagePanel } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BackgroundImage from "../components/BackgroundImage";
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
      <BackgroundImage isIntro={true}>
        <StatusBar hidden={true} />
      </BackgroundImage>
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
