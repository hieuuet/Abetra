/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { IMAGE } from "../../constant/assets";
import style_common from "../../style-common";
import ItemSlider from "./ItemSlider";
import ModalDropdown from "../../components/ModalDropdown";
const { width, height } = Dimensions.get("window");
import { FIRST_INSTALL } from "../../constant/KeyConstant";
import { NavigationActions, StackActions } from "react-navigation";
import { getCurrentLanguage } from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LANGUAGE, DEFAULT_LANGUGE } from "../../constant/KeyConstant";
import BackgroundImage from "../../components/BackgroundImage";
import { COLOR } from "../../constant/Color";
import { TEXT_INTRO } from "../../language";
const heightHeader = 100;
const isIphoneX =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812);
class AppIntroSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width,
      height,
      activeIndex: 0
    };

    const arrSlide = this.props.navigation.getParam("arrSlide");
    this.slides = [
      {
        id: "somethun",
        title: "Title 1",
        text: "Description.\nSay something cool",
        image: arrSlide[0] || "",
        imageStyle: styles.image,
        backgroundColor: "#59b2ab"
      },
      {
        id: "somethun-dos",
        title: "Title 2",
        text: "Other cool stuff",
        image: arrSlide[1] || "",
        imageStyle: styles.image,
        backgroundColor: "#febe29"
      },
      {
        id: "somethun1",
        title: "Rocket guy",
        text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
        image: arrSlide[2] || "",
        imageStyle: styles.image,
        backgroundColor: "#22bcb5"
      }
    ];

    this.allLanguage = this.props.navigation.getParam("allLanguage");
    this.language = this.allLanguage.map(item => item.ShortName);
    this.listIcon = this.allLanguage.map(item => item.Icon);
    this.heightDropdown =
      this.language.length > 5 ? 5 * 35 : this.language.length * 35;
    this.defaultLanguage = this.language.findIndex(item => item === "vi-VN");
    this.defaultLanguage =
      this.defaultLanguage !== -1 ? this.defaultLanguage : 0;
  }

  selectLanguage = async (rowID, rowData) => {
    const lanSelected = this.allLanguage.find(
      item => item.ShortName === rowData
    );
    if (lanSelected) {
      await AsyncStorage.setItem(LANGUAGE, JSON.stringify(lanSelected));
      this.props.getCurrentLanguage();
    }
  };
  goToSlide = pageNum => {
    this.setState({ activeIndex: pageNum });
    this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
  };

  onNextPress = () => {
    this.goToSlide(this.state.activeIndex + 1);
  };
  onDone = () => {
    //Navigate to new screen
    AsyncStorage.setItem(FIRST_INSTALL, "1");
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Register" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _onLayout = () => {
    const { width, height } = Dimensions.get("window");
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({ width, height });
      // Set new scroll position
      const func = () => {
        this.flatList.scrollToOffset({
          offset: this.state.activeIndex * width,
          animated: false
        });
      };
      Platform.OS === "android" ? setTimeout(func, 0) : func();
    }
  };
  _onMomentumScrollEnd = e => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = Math.round(offset / this.state.width);
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      this.goToSlide(newIndex);
      return;
    }

    const lastIndex = this.state.activeIndex;
    this.setState({ activeIndex: newIndex });
    this.goToSlide(newIndex);
  };
  _renderItem = item => {
    const { width, height } = this.state;
    const bottomSpacer = 88 + (isIphoneX ? 34 : 0) + 64;
    const _height = height - heightHeader * 2;
    const props = { ...item.item, bottomSpacer, width, height: _height };

    return <ItemSlider key={item.index} {...props} />;
  };

  render() {
    return (
      <BackgroundImage isIntro={true} showBackIcon={false}>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }}
        >
          <FlatList
            ref={ref => (this.flatList = ref)}
            data={this.slides}
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            horizontal
            extraData={this.state.width}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.id}
            onLayout={this._onLayout}
          />
        </View>
        <View style={styles.header}>
          <Image
            source={IMAGE.logo}
            resizeMode="cover"
            style={style_common.img_logo}
          />
          <View style={style_common.container}>
            <Text style={styles.text_title}>{TEXT_INTRO().IntroTitle}</Text>
          </View>
          <View style={styles.language}>
            <ModalDropdown
              options={this.language}
              defaultIndex={this.defaultLanguage}
              defaultValue={this.language[this.defaultLanguage]}
              textStyle={styles.text_dropdown}
              style={styles.dropdown}
              onSelect={this.selectLanguage}
              listIcon={this.listIcon}
              dropdownStyle={{ height: this.heightDropdown }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        {this._renderPagination()}
      </BackgroundImage>
    );
  }

  //Render common button for footer
  _renderButton = (name, onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.btn_bottom}>
        <Text style={styles.text_btn}>{name}</Text>
      </TouchableOpacity>
    );
  };

  _renderNextButton = () =>
    this._renderButton(TEXT_INTRO().Continue, this.onNextPress);
  _renderDoneButton = () =>
    this._renderButton(TEXT_INTRO().Continue, this.onDone);
  _renderPagination = () => {
    const isLastSlide = this.state.activeIndex === this.slides.length - 1;
    const isFirstSlide = this.state.activeIndex === 0;
    const btn = isLastSlide
      ? this._renderDoneButton()
      : this._renderNextButton();

    return (
      <View style={styles.footer}>
        <View style={styles.paginationDots}>
          {this.slides.length > 1 &&
            this.slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === this.state.activeIndex
                    ? styles.activeDotStyle
                    : styles.dotStyle
                ]}
              />
            ))}
        </View>
        {btn}
      </View>
    );
  };
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    height: heightHeader,
    flexDirection: "row"
  },
  language: {
    width: 100,
    margin: 10
    // backgroundColor:'red'
  },
  text_title: {
    textAlign: "center",
    width: "100%",
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    color: COLOR.COLOR_WHITE
  },
  footer: {
    backgroundColor: "transparent",
    height: heightHeader,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  image: {
    width: 200,
    height: 200
  },
  btn_bottom: {
    borderRadius: 20,
    padding: 5,
    minWidth: 100,
    minHeight: 40,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: COLOR.COLOR_ORANGE,
    position: "absolute",
    right: 20,
    bottom: 10
  },
  text_btn: {
    textAlign: "center",
    color: COLOR.COLOR_WHITE
  },
  paginationDots: {
    height: 16,
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  dot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4
  },
  activeDotStyle: {
    backgroundColor: "green"
  },
  dotStyle: {
    backgroundColor: COLOR.COLOR_WHITE
  },
  dropdown: {
    width: 100,
    borderColor: "gray"
  },
  text_dropdown: {
    textAlign: "center",
    color: COLOR.COLOR_WHITE
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLanguage: bindActionCreators(getCurrentLanguage, dispatch)
  };
};

AppIntroSlider = connect(
  null,
  mapDispatchToProps
)(AppIntroSlider);
export default AppIntroSlider;
