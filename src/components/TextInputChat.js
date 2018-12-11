import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  findNodeHandle,
  Platform,
  NativeModules,
  BackHandler,
  Keyboard
} from "react-native";
let ImagePicker = NativeModules.ImageCropPicker;

import Icon from "react-native-vector-icons/Ionicons";
import TextInputReset from "react-native-text-input-reset";
import { URL_BASE } from "../constant/api";
import { COLOR } from "../constant/Color";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import style_common from "../style-common";
import { compose } from "redux";
import injectShowAlert from "../constant/injectShowAlert";

class TextInputChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textSubmit: "",
      showEmoticons: false
    };
    this.arrBase64 = [];
    this.arrPath = [];
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      const isAlertShow = this.props.closeAlert();
      if (isAlertShow) {
        return true;
      }
      if (this.state.showEmoticons) {
        this.setState({ showEmoticons: false });
        return true;
      }
      // this.props.navigation.goBack();
      // return true;
    });

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (this.state.showEmoticons) {
          this.setState({ showEmoticons: false });
        }
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.keyboardDidShowListener.remove();
  }

  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: "MediumQuality",
      includeExif: true
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onClickSend = () => {
    // console.log("data",this.state.textSubmit)
    this.dismissAllModalShow();

    this.props.onReceiveTextInputClick(this.state.textSubmit);
    // this.refs.textInput.clear();
    if (Platform.OS === "android")
      TextInputReset.resetKeyboardInput(findNodeHandle(this.textInput));
    this.setState({ textSubmit: "" });
  };

  onEmojiSelected = emoji => {
    let textSubmit = this.state.textSubmit;
    textSubmit += emoji;
    this.setState({ textSubmit });
  };

  dismissAllModalShow = () => {
    if (this.state.showEmoticons) {
      this.setState({ showEmoticons: false });
    }
    Keyboard.dismiss();
  };

  render() {
    // console.log("render---",this.state.textSubmit)
    return (
      <View
        style={{
          height: this.state.showEmoticons ? 240 : 35,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            height: 30,
            // flexWrap: 'wrap',
            flexDirection: "row",
            // alignSelf: 'center',
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5
            // borderTopColor:'gray',
            // borderTopWidth:1,marginLeft: 15

            // backgroundColor:'gray'
          }}
        >
          {/*<TouchableOpacity onPress={() => this.pickSingle(false)}>*/}
          {/*<Image*/}
          {/*source={require("../../assets/image_icon.png")}*/}
          {/*style={{*/}

          {/*height: 20,*/}
          {/*width: 40*/}
          {/*}}*/}
          {/*resizeMode="cover"*/}
          {/*/>*/}
          {/*</TouchableOpacity>*/}

          <View
            style={{
              flex: 1,
              minHeight: 30,
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#A8A8A7",
              borderWidth: 1,
              marginLeft: 15,
              borderRadius: 15,
              marginRight: 10
            }}
          >
            <TextInput
              style={{
                paddingTop: 0,
                paddingRight: 10,
                paddingBottom: 0,
                flex: 1,
                minHeight: 30,
                paddingLeft: 10
              }}
              placeholder={"Nhập vào đây..."}
              placeholderTextColor={"#A8A8A7"}
              underlineColorAndroid="transparent"
              autoCapitalize={"none"}
              value={this.state.textSubmit}
              returnKeyType={"done"}
              onChangeText={text => {
                this.setState({ textSubmit: text });

                this.input_msg = text;
              }}
              ref={input => {
                this.textInput = input;
              }}
            />
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.setState({ showEmoticons: true });
              }}
            >
              <Image
                style={styles.btn}
                source={require("../../assets/btn_emo.png")}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/*<TouchableOpacity*/}
              {/*onPress={() => {*/}
                {/*this.dismissAllModalShow();*/}
                {/*this.pickSingle(false);*/}
              {/*}}*/}
            {/*>*/}
              {/*<Image*/}
                {/*style={styles.btn}*/}
                {/*source={require("../../assets/btn_img.png")}*/}
                {/*resizeMode="cover"*/}
              {/*/>*/}
            {/*</TouchableOpacity>*/}
          </View>
          <TouchableOpacity
            onPress={this.onClickSend}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 60,
              height: 30,
              backgroundColor: "#7EC08A",
              marginRight: 10,
              borderRadius: 30 / 2
            }}
          >
            <Text style={{ color: COLOR.COLOR_BACKGROUND }}>GỬI</Text>
          </TouchableOpacity>
        </View>
        {this.state.showEmoticons ? (
          <View style={styles.wrapper_emoji}>
            <TouchableOpacity
              style={style_common.container}
              onPress={() => {
                this.setState({ showEmoticons: false });
              }}
            />
            <EmojiSelector
              onEmojiSelected={this.onEmojiSelected}
              category={Categories.people}
              showSearchBar={false}
              showTabs={false}
              showHistory={true}
              columns={10}
              style={styles.emoji}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default compose(injectShowAlert)(TextInputChat);
const styles = StyleSheet.create({
  btn: {
    height: 22,
    marginRight: 10,
    width: 22
  },
  wrapper_emoji: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    // left: 0,
    // bottom: 0
    flex: 1
  },
  emoji: {
    backgroundColor: "gray",
    height: 200
  }
});
