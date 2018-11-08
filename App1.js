/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  NetInfo,
  YellowBox,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  BackHandler,
  TouchableOpacity
} from "react-native";
const { height, width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import RootStack from "./src/routers/Navigation";
import { showAlert2 } from "./src/components/CommonView";
import AnimatedModal from "./src/components/AnimatedModal";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

import store from "./src/store/index";
export default class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false
    };
    this.currentValue = undefined;
  }

  componentDidMount() {
    
    this.unsubscribe = store.subscribe(listener => {
      const previousValue = this.currentValue;
      this.currentValue = store.getState().dataAlert;
      if (
        previousValue &&
        this.currentValue &&
        this.currentValue.id !== previousValue.id
      ) {
        console.log("show alert");
        this.setState({ isShowAlert: true });
      }
    });
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  componentWillUnmount() {
    console.log("state2", this.state);
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
    this.unsubscribe();
  }
  _handleConnectionChange = isConnected => {
    store.dispatch({ type: "NETWORK_CHANGE", payload: { isConnected } });
  };

  render() {
    YellowBox.ignoreWarnings([
      "Warning: componentWillMount is deprecated",
      "Warning: componentWillReceiveProps is deprecated",
      "Warning: isMounted(...) is deprecated"
    ]);
    return (
      <View style={{ flex: 1 }}>
        <Root />
        <AnimatedModal
          visible={this.state.isShowAlert}
          onClose={() => {
            this.setState({ isShowAlert: false });
          }}
          onSubmit={() => {
            this.setState({ isShowAlert: false });
          }}
        >
          <Text style={{ color: "#000000" }}>noi dung</Text>
        </AnimatedModal>
      </View>
    );
  }
}

export class Root extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    console.log("render root stack");
    return <RootStack />;
  }
}
