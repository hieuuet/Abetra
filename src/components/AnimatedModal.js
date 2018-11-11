import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ImageBackground,
  BackHandler
} from "react-native";
import { IMAGE } from "../constant/assets";
import { ButtonBorder } from "../components/CommonView";
const { height, width } = Dimensions.get("window");
import style_common from "../style-common";
import { strings } from "../language/i18n";
export default class AnimatedModal extends Component {
  constructor(props) {
    super(props);
    this.yTranslate = new Animated.Value(0);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("onbackpress=====", this.state);
      this.props.onClose();
      // return true;
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible) {
      // animate the showing of the modal
      this.yTranslate.setValue(0); // reset the animated value
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start();
    } else {
      // animate the hiding of the modal
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const { title, children, onClose, onSubmit } = this.props;

    let negativeHeight = -height;
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    });

    let translateStyle = { transform: [{ translateY: modalMoveY }] };

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <View style={{ width: "80%", minHeight: 200 }}>
          <ImageBackground
            source={IMAGE.header_alert}
            style={{
              height: 40,
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
            resizeMode="cover"
          >
            <Text>{title || strings("common.noti_title")}</Text>
          </ImageBackground>
          <View style={styles.modalContent}>{children}</View>
          <View style={styles.wraper_btn}>
            <ButtonBorder
              label={strings("common.confirm")}
              onPress={onSubmit}
              my_style={styles.btn_left}
            />
            <ButtonBorder
              label={strings("common.cancel")}
              my_style={[style_common.btn_blue_radius, styles.btn_right]}
              onPress={onClose}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height,
    width,
    bottom: -height,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100
  },
  btn_left: { flex: 1, marginRight: 5, minWidth: 100 },
  btn_right: { flex: 1, marginLeft: 5, minWidth: 100 },
  wraper_btn: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
