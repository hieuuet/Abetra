import React, { Component } from "react";
import { AsyncStorage, StatusBar } from "react-native";
import { USER_ID, FIRST_INSTALL } from "../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";
import {
  getAllLanguage,
  getCurrentLanguage,
  getcommonSetting
} from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BackgroundImage from "../components/BackgroundImage";
import { LANGUAGE, DEFAULT_LANGUGE } from "../constant/KeyConstant";
import { IMAGE } from "../constant/assets";

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.img_bg =
      this.props.currentLanguage.Code === "vi-VN"
        ? IMAGE.intro_vi
        : IMAGE.intro_en;
  }

  componentDidMount() {
    this.checkLoginNavigate();
  }
  shouldComponentUpdate() {
    // this.img_bg =
    //   this.props.currentLanguage.Code === "vi-VN"
    //     ? IMAGE.intro_vi
    //     : IMAGE.intro_en;
    return true;
  }
  checkLoginNavigate = async () => {
    await this.props.getCurrentLanguage();
    const isFirstInstall = await AsyncStorage.getItem(FIRST_INSTALL);
    let routerName = "Login";
    let allLanguage = [];
    let arrSlide = [];
    if (isFirstInstall === null) {
      routerName = "Intro";
      allLanguage = await getAllLanguage()
        .then(data => data.Value || [])
        .catch(err => console.log("err---", err));
      await AsyncStorage.setItem(
        LANGUAGE,
        JSON.stringify(
          (allLanguage.length > 0 && allLanguage[0]) || DEFAULT_LANGUGE
        )
      );
      this.props.getCurrentLanguage();
      arrSlide = await getcommonSetting({ Option: 6 }, false).then(
        data =>
          (data &&
            data.Value &&
            data.Value[0] &&
            data.Value[0].SlideImage &&
            data.Value[0].SlideImage.split(",")) ||
          []
      );
    } else {
      const userID = await AsyncStorage.getItem(USER_ID);
      if (userID) routerName = "WrapperTab";
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
      <BackgroundImage
        isIntro={true}
        showBackIcon={false}
        source_img={IMAGE.intro_vi}
      >
        <StatusBar hidden={true} />
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLanguage: state.currentLanguage
  };
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
